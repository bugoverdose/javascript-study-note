/*
[Guard]
1) const gqlContext = GqlExecutionContext.create(context).getContext();
   // AppModule의 GraphQLModule의 context이 return한 값 받기
   // ExecutionContext(= http req 혹은 ws connection)의 정보를 GraphQL context로 받기.

1-1) gqlContext로 받은 토큰 해석 => user 정보 찾기

2) role metadata & user.role에 따라 1차적으로 auth 판단.

3) gqlContext['user'] = user;
   // gqlContext의 user key에 토큰으로 찾은 user 정보 대입.
   // => Decorator => Resolver => Services로 자동으로 전달됨. 
      별도의 return, export 작업 없이 그대로 gqlContext로 접근 가능.

4) @AuthUser 데코레이터에서 ExecutionContext의 정보로 gqlContext 접근
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
  } 
  // => user 정보 그대로 접근하여 resolver의 인자로 그대로 대입 가능.
*/
// [auth.guard.ts]
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // 1) metadata 받기 위해 reflector 주입.
    private readonly jwtService: JwtService, // JwtModule에서 JwtService를 export해줘서 주입 가능.
    private readonly userService: UsersService, // UsersModule에서 UsersService를 export해서 주입 가능. // AuthorizationModule에서 imports: [UsersModule]해줘야 주입 가능.
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    ); // 2) resolver들에 접근할 때마다 'roles' metadata로 설정된 값이 있다면 담기게 됨.
    if (!roles) {
      return true; // @Role 즉 @SetMetadata 적용되지 않았으면 undefined 담김.
    } // 3) public resolver로 간주 => 로그인 여부와 무관하게 접근 가능. Authorization 부여.

    // 4) metadata 존재시, private resolver이므로 로그인 여부 확인. 로그인되어야만 접근 가능.
    // gqlContext : AppModule의 GraphQLModule.forRoot의 context 메서드가 return한 객체
    const gqlContext = await GqlExecutionContext.create(context).getContext(); // ExecutionContext(= http req 혹은 ws connection)의 정보를 GraphQL context로 받기.
    const token = gqlContext.token;
    if (token) {
      const decoded = this.jwtService.verify(token.toString()); // 해석된 토큰의 user id는 object에 담김. 혹은 string.
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await this.userService.findById(decoded['id']); // user id에 해당하는 사용자 정보 찾기(UserEntity)
        if (!user) {
          return false; // 5) 토큰O. 하지만 정상적으로 로그인된 사용자가 아님 => 접근 차단.
        }
        gqlContext['user'] = user; // @Auth() 데코레이터, resolver들에서 사용 가능해짐.
        // 별도로 return 혹은 export하지 않아도 gqlContext 통해 그대로 받을 수 있음.
        if (roles.includes('Any')) {
          return true; // 6) 로그인한 사용자인데, resolver의 metadata 값이 'Any'인 경우 접근 가능. Authorization 부여.
        }
        // 7) roles 배열(metadata)에 로그인된 사용자의 role이 포함되면 true => 접근 가능.
        return roles.includes(user.role); // cf) user.role: 로그인된 사용자의 role
      } else {
        return false; // 토큰 decode 실패 => 정상적으로 로그인된 사용자가 아님 => 접근 차단.
      }
    } else {
      return false; // 토큰 부여되지 않음 = 로그인하지 않고 private resolver에 접근했다는 의미.
    }
  }
}

// ==========================================================================
// [authorization.module.ts]
@Module({
  imports: [UsersModule], // export된 UsersService를 AuthGuard에 주입하기 위해 필요.
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
  // AuthGuard를 앱의 모든 Resolver에 자동으로 적용. => 코드 중복 최소화.
})
export class AuthorizationModule {}

// ==========================================================================
// [auth-user.decorator.ts]
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext(); // ExecutionContext(= http req 혹은 ws connection)의 정보를 GraphQL context로 받기.
    const user = gqlContext['user']; // AuthGuard에서 대입된 user 정보.
    return user; // 토큰을 통해 해석된 현재 로그인된 사용자 정보. UserEntity
  },
);
// 매개변수 데코레이터. 자동으로 인자에 user를 대입해줌.
// ===========================================================================
