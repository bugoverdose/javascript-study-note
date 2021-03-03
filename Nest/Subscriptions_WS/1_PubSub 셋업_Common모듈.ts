/*
  대원칙: 앱 전체에서 PubSub은 오직 하나여야 모듈 간 서로 연결될 수 있음.
  - DB connection & PubSub 모두 unique하게 셋업되어야 함.

  CommonModule
  - @Global로 global 모듈화 & AppModule에서 imports
  - 앱 전체에서 활용할 PubSub 인스턴스를 값으로 provide & export

  사용할 @Resolver들에 주입.
  - @Inject(PUB_SUB) // provide에 설정한 token을 인자로 대입.

cf) 주의, 서버가 여러개일 경우, 별도의 서버에서 PubSub 인스턴스를 생성하여
          모든 서버들이 해당 인스턴스를 공유하도록 별도의 작업 필요.
    ex) graphql-redis-subscriptions : redis DB에 요금을 내서 활용 가능.
*/
// [common.module.ts]
import { Global, Module } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { PUB_SUB } from "./common.constants";

const pubsub = new PubSub(); // pubsub 인스턴스 생성

@Global() // 3) 앱 어디서든 providers의 값 접근 가능하도록 global 모듈화
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    }, // 1) 앱 시작 = CommonModule 생성시 pubsub 인스턴스를 앱 전체에 provide
  ],
  exports: [PUB_SUB], // 2) 외부에서 사용가능하도록 export
})
export class CommonModule {}

// ====================================================================
// [common.constants.ts]
export const PUB_SUB = "PUB_SUB";

// ====================================================================
// [orders.resolver.ts]
@Resolver((of) => OrderEntity)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) {}

  @Role(["Any"])
  @Subscription((returns) => String) // listening to trigger. 1) 대기 및 반응.
  kimchiSubscription(@AuthUser() authUser: UserEntity) {
    console.log(authUser);
    return this.pubSub.asyncIterator("kimchi"); // trigger명: 'kimchi'
  }

  @Mutation((returns) => Boolean) // kimchi asyncIterator를 발생시키는 작업 실행 필요.
  kimchiReady() {
    this.pubSub.publish("kimchi", { kimchiSubscription: "Good Kimchi" });
    // pubSub.publish(트리거, payload). 2) Subscription에 메시지 보내기.
    // 트리거: pubSub.asyncIterator(트리거)의 트리거명에 대응.
    // payload: {key:message} 객체. key: Subscription 메서드명에 대응.
    return true;
  }
}

// ====================================================================
