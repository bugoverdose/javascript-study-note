/*
  Guard는 http 요청 & ws 연결에 대해 공통적으로 적용됨. 즉, Guard는 모든 graphQL resolver에 대해 호출됨.
  : HTTP resolver(Query,Mutation) & Subscription resolver 모두 적용됨.
  - 비교) NestMiddleware의 req, res, next는 http 요청시에만 적용. => ws 연결시, http headers의 정보 받을 수 없음.
  
0) NestMiddleware => GraphQLModule.forRoot의 context 
   => Guard의 GqlExecutionContext : Header에 담긴 정보 전달 흐름.

1) AppModule: GraphQLModule.forRoot의 context
  - query/mutation: http 요청시 req 객체만 생성됨.
  - subscription: ws 연결하는 경우 connection 객체만 생성. { req: undefined }
  => HTTP Header에 담긴 정보들은 req.headers['x-jwt'] 혹은 connection.context에 담김 
  => 해당 정보를 context 메서드가 return하면 resolver들로 전달됨. 
  => 즉 우선적으로 GraphQL context로써 AuthGuard로 전달됨.

2) canActivate(context: ExecutionContext) { 
     const gqlContext = GqlExecutionContext.create(context).getContext();
  // => GraphQLModule.forRoot의 context에서 return된 값은 gqlContext에 담김.
*/
// [app.module.ts]
@Module({
  imports: [
    // ~~
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true, // ws 프로토콜 대응 설정. 서버가 웹소켓 기능 지니도록 설정.
      autoSchemaFile: true, // schema.gql 파일을 메모리에 생성 + 저장. // Code first 접근: queries & resolvers를 기준으로 자동으로 스키마 생성. (TS의 힘) // autoSchemaFile: join(process.cwd(), 'src/schema.gql') : schema.gql 파일을 src 폴더에 직접 저장

      // NestMiddleware => GraphQLModule.forRoot의 context => Guard의 GqlExecutionContext : Header에 담긴 정보 전달 흐름.
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        if (req) {
          return { token: req.headers['x-jwt'] }; // query/mutation: http 요청시 req 객체만 생성됨.
          // req의 headers 정보를 resolver들로 전달. 즉 Guard로 전달.
        } else if (connection) {
          return { token: connection.context['X-JWT'] }; // subscription: ws 연결하는 경우 connection 객체만 생성.
        } // HTTP Header에 담긴 정보들은 connection.context에 담김 => resolver들로 전달. 즉 Guard로 전달.
      }, // ws 프로토콜에서는 req 객체에 undefined가 담기게 됨 => if문으로 에러 예방.
    }),
    // ~~
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// ==========================================================================
// [auth.guard.ts]
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // gqlContext : GraphQLModule.forRoot({context: ~})에서 context 메서드가 return한 값
    const gqlContext = GqlExecutionContext.create(context).getContext(); // http context의 정보 GraphQL context로 받기.
    console.log(gqlContext.token); // gqlContext: http/ws 측면의 context. http req 혹은 ws connection에 담겨진 사용자 정보 등 그대로 접근 가능.
    // ~~
    return true;
  }
}

// ==========================================================================
console.log(gqlContext.token); // http & ws 모두 HTTP Headers의 토큰 값 전달됨.
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0NjkwNTU1fQ.rIhDrD9mO81UVBNBugchBYqkf4oUtMsOgiFdQtZJ4Kw
