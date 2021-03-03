/*
  0) npm i graphql-subscriptions
  
  1) @Resolver에서 @Subscription 설정. 
     - 해당 메서드는 return pubsub.asyncIterator(triggers) 필요.

  2) AppModule에서 GraphQLModule - context에는 req 혹은 connection이 담김.
    - query/mutation시 req 객체에 정보들 담김.
    - subscription시 connection에 정보들 담김. 
      : connection.context : HTTP HEADERS에 넣은 정보 접근 가능('X-JWT' 등).
*/
const pubsub = new PubSub(); // pubsub 인스턴스 필요.

@Resolver((of) => OrderEntity)
export class OrderResolver {
  @Subscription((returns) => String) 
  orderSubscription() {
    return pubsub.asyncIterator('kimchi'); // pubsub.asyncIterator(triggers)
  } // trigger: event. listen하는 이벤트. "문자열" 등 어떤 값이든 가능.
}
// =====================================================================================
// [app.module.ts]
@Module({
  imports: [
    // ~~
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true, // ws 프로토콜 대응 설정. 서버가 웹소켓 기능 지니도록 설정.
      autoSchemaFile: true, // schema.gql 파일을 메모리에 생성 + 저장.
      context: ({ req, connection }) => {
        if (req) {
          console.log(req); // http 요청시 존재
          return { user: req['user'] }; // req에 담긴 user 내용을 받아서 resolver들에서도 사용 가능하도록 전달.
        } else {
          console.log(connection); // ws 연결시 존재
        }
      },
    }),
    // ~~
})
export class AppModule implements NestModule { ~~ }

// =====================================================================================
// http://localhost:3000/graphql

// WS
subscription{
  orderSubscription
}
// HTTP HEADERS : { "X-JWT":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0NjkwNTU1fQ.rIhDrD9mO81UVBNBugchBYqkf4oUtMsOgiFdQtZJ4Kw"}
{
    query: 'subscription {\n  orderSubscription\n}\n',
    context: {
        'X-JWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0NjkwNTU1fQ.rIhDrD9mO81UVBNBugchBYqkf4oUtMsOgiFdQtZJ4Kw'
    }, 
    // ~~
    schema: GraphQLSchema {
     // ~~
    }
  }
  
// =====================================================================================
// [HTTP]
mutation {
  login(input: {
    email: "test2@naver.com", 
    password: "testtest",
  }){
    ok,
    error,
    token
  }
}
// HTTP HEADERS : { "X-JWT":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0NjkwNTU1fQ.rIhDrD9mO81UVBNBugchBYqkf4oUtMsOgiFdQtZJ4Kw"}
  IncomingMessage {
    // ~~
    headers: {
      'x-jwt': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjE0NjkwNTU1fQ.rIhDrD9mO81UVBNBugchBYqkf4oUtMsOgiFdQtZJ4Kw',
     // ~~
    },
    // ~~ 
    user: UserEntity {
      id: 2,
      createdAt: 2021-02-25T16:02:23.504Z,
      updatedAt: 2021-02-25T16:02:23.504Z,
      email: 'test2@naver.com',
      role: 'Owner',
      emailVerified: false
    }, 
  }
  // ===========================================================  