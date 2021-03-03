/*
[Query/Mutation/Subscription 모두 활용가능한 범용성 확보를 위한 셋업]

0) npm i graphql-subscriptions
 
1) Subscription 핸들링 가능 설정 설치. (AppModule)
  GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
  )}
// ws 프로토콜 대응 설정. 서버가 웹소켓 기능 지니도록 설정. 

2) NestMiddleware는 ws 연결시 활용 불가 => AppModule에서 제거.
  : NestMiddleware의 req, res, next는 http 요청시에만 적용. 

3) gqlContext 셋업: Query/Mutation/Subscription 모두 적용되는 Auth 설정 필요. 

3-1) AppModule : GraphQLModule - context에는 req 혹은 connection이 담김.
- req.headers['x-jwt']        : query/mutation시 req 객체에 정보들 담김.
- connection.context['X-JWT'] : subscription시 connection에 정보들 담김. { req: undefined }
// HTTP HEADERS에 'X-JWT' key로 대입된 정보들 접근하여 gqlContext로 전달.

3-2) Guard : ExecutionContext를 통해 gqlContext에 접근 및 데이터 조작.

  async canActivate(context: ExecutionContext) { 
    const gqlContext = await GqlExecutionContext.create(context).getContext();
    gqlContext['user'] = user; // 추가 정보 대입.
  } 

3-3) Decorator : ExecutionContext를 통해 gqlContext에 접근 및 데이터 조작.

  createParamDecorator((data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext(); // ExecutionContext(= http req 혹은 ws connection)의 정보를 GraphQL context로 받기.
    const user = gqlContext['user']; // 추가된 정보 접근.
  }
*/
// [app.module.ts]
@Module({
  imports: [
    // ~~
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true, // ws 프로토콜 대응 설정. 서버가 웹소켓 기능 지니도록 설정.
      autoSchemaFile: true, // schema.gql 파일을 메모리에 생성 + 저장. // Code first 접근: queries & resolvers를 기준으로 자동으로 스키마 생성. (TS의 힘) // autoSchemaFile: join(process.cwd(), 'src/schema.gql') : schema.gql 파일을 src 폴더에 직접 저장
      context: ({ req, connection }) => {
        return {
          token: req ? req.headers["x-jwt"] : connection.context["X-JWT"], // token key에 정보 대입하여 Guard 등에서 접근 가능하도록.
        }; // query/mutation: http 요청시 req 객체만 생성됨.
      }, // subscription: ws 연결하는 경우 connection 객체만 생성. { req: undefined }
      // => HTTP Header에 담긴 정보들은 req.headers['x-jwt'] 혹은 connection.context에 담김 => resolver들로 전달. 즉 AuthGuard로 전달.
    }), // NestMiddleware => GraphQLModule.forRoot의 context => Guard의 GqlExecutionContext : Header에 담긴 정보 전달 흐름.
    // ~~
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
// =========================================================================
// [auth.guard.ts]
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    // gqlContext : AppModule의 GraphQLModule.forRoot의 context 메서드가 return한 객체
    const gqlContext = await GqlExecutionContext.create(context).getContext(); // ExecutionContext(= http req 혹은 ws connection)의 정보를 GraphQL context로 받기.
    const token = gqlContext.token; // token key에 대입된 정보 찾기.
    // ~~
    gqlContext["user"] = user; // user key에 로그인된 사용자 정보 찾아서 대입.
  }
}
// =========================================================================
// [auth-user.decorator.ts]
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext(); // ExecutionContext(= http req 혹은 ws connection)의 정보를 GraphQL context로 받기.
    const user = gqlContext["user"]; // AuthGuard에서 대입된 user 정보.
    return user; // 토큰을 통해 해석된 현재 로그인된 사용자 정보. UserEntity
  }
);
