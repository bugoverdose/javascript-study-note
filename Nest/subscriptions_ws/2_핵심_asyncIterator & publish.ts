/*
  Subscription메서드명
  return pubsub.asyncIterator('triggerKey');
  // listening to updates. 대기하다가 반응하는 역할.

  Query/Mutation메서드명은 자유
  pubsub.publish('triggerKey', { Subscription메서드명: '메시지' });
  // 해당 Subscription으로 해당 메시지 전송. 사건 발생시키는 역할.
*/
const pubsub = new PubSub(); // pubsub 인스턴스 필요.

@Resolver((of) => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Subscription((returns) => String) // 트리거 리스닝. 대기 및 반응.
  kimchiSubscription() {
    return pubsub.asyncIterator('kimchi'); // pubsub.asyncIterator(triggers)
  } // trigger: event. listen하는 이벤트. "문자열" 등 어떤 값이든 가능.

  @Mutation((returns) => Boolean) // kimchi asyncIterator를 발생시키는 작업 실행 필요.
  kimchiReady() {
    pubsub.publish('kimchi', { kimchiSubscription: 'Good Kimchi' }); 
    // pubsub.publish(트리거, payload). : Subscription에 메시지 보내기.
    // 트리거: pubsub.asyncIterator(트리거)에 대응. 같은 트리거명 설정.
    // payload: {key:message} 객체. key: Subscription 메서드의 이름과 동일하도록.

    return true;
  }
}
// ====================================================================
// ====================================================================
// localhost:3000/graphql
// 0) subscription 실행하고 대기. 
subscription{
  kimchiSubscription
}
// 1) Listening 상태로 계속 대기기
// 3) mutation 실행시, 트리거에 대한 반응으로 메시지 받음.
{
  "data": {
    "kimchiSubscription": "Good Kimchi"
  }
}
{
  "data": {
    "kimchiSubscription": "Good Kimchi"
  }
}
// ====================================================================
// 2) mutation 실행X2 => subscription으로 특정 메시지 전송.
mutation{
  kimchiReady
}
{
  "data": {
    "kimchiReady": true
  }
}
// ====================================================================