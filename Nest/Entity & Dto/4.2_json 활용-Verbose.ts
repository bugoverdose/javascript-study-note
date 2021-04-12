/* 
  주의: json 문자열에 어떤 내용이 들어올 수 있는지는 frontend에서 통제 필요.
  - GraphQL로 어떤 데이터든 전달 가능. TypeORM으로는 통제 불가. 
  - service에서 입력된 json 데이터를 토대로 DB의 데이터와 대조 작업은 가능.
  - 장점: 유연성. 별도의 DB 작업 불필요.

  DishOption은 DB 간 relation 설정X 
  : 선택한 옵션들에 대한 정보는 json형태의 text로 저장.
  : 해당 옵션들은 각 주문이 생성되고 완료될 때 독립적으로 매번 저장.
  : DishOption의 내용들은 자유롭게 수정해도 문제 없도록.  
*/
@InputType("OrderItemOptionInputType", { isAbstract: true }) // dto. 필요 없으면 삭제 가능.
@ObjectType() // GraphQL
export class OrderItemOption {
  @Field((type) => String) // GraphQL만
  chosenOption: string; // 고객이 주문할 때 선택한 옵션명. (portion size 양)

  @Field((type) => String, { nullable: true }) // 선택가능한 세부 선택지가 없을 수도 있음.
  chosenOptionChoice?: string; // 선택한 옵션의 세부 선택지. (medium size)

  @Field((type) => Number, { nullable: true })
  extraPrice?: number; // 옵션 자체 추가비용. DishChoice별 추가비용과 무관.
} // No TypeORM

@InputType("OrderItemInputType", { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class OrderItemEntity extends CoreEntity {
  @ManyToOne(
    (type) => DishEntity, // inverse 설정X => 반대쪽에서 연결된 이쪽에 접근할 필요가 없음.
    { onDelete: "CASCADE", nullable: true } // 반대쪽의 DishEntity가 삭제되면 이쪽에 연결된 OrderItem 데이터들도 자동 삭제.
  ) // TypeOrm - 참고: @ManyToOne는 디폴트값이 {nullable: true} 생략 가능
  dish: DishEntity; // 고객이 주문한 요리.

  @Field((type) => [OrderItemOption], { nullable: true }) // GraphQL
  @Column({ type: "json", nullable: true }) // TypeORM
  options?: OrderItemOption[]; // 주문할 때 고객이 실제로 선택한 옵션들
}

// ==============================================================
@Injectable()
export class OrderService {
  // ~~
  async createOrder(
    customer: UserEntity,
    { restaurantId, items }: CreateOrderInputDto
  ): Promise<CreateOrderOutputDto> {
    try {
      const restaurant = await this.restaurantRepo.findOne(restaurantId);
      if (!restaurant) {
        return { ok: false, error: "Restaurant Not Found." };
      } // 주문할 음식점이 DB에 존재하는지 확인.

      let orderTotalPrice = 0; // 주문의 최종 가격.
      const orderItems: OrderItemEntity[] = []; // 주문이 들어온 각 요리들.

      // item : 고객이 주문한 각 요리들.
      for (const item of items) {
        const dish = await this.dishesRepo.findOne(item.dishId); // 고객이 주문한 각 요리들 순차적으로 DB에서 찾기.
        if (!dish) {
          return { ok: false, error: "Dish Not Found." };
        } // 주문하려고 선택된 요리들이 DB에 존재하지 않는 경우.

        let dishFinalPrice = dish.price; // 각 요리의 기본 가격을 기준으로 선택된 옵션의 추가 가격들 가산.

        // 고객이 요리에 적용한 옵션들 전부 DB에 존재하는지 체크 & DB에서 추가 가격 체크하여 가산.
        for (const itemOption of item.options) {
          const dishOption = dish.options.find(
            (dishOption) => dishOption.optionName === itemOption.chosenOption
          ); // dish.options 배열의 각 요소 dishOption에 대해 optionName이 고객이 선택한 chosenOption과 일치하는 데이트만 찾기.
          if (dishOption) {
            if (dishOption.extraPrice) {
              dishFinalPrice += dishOption.extraPrice; // DB 기준. 해당 옵션 자체의 추가 가격.
            } else {
              const dishOptionChoice = dishOption.choices.find(
                (optionChoice) =>
                  optionChoice.choiceName === itemOption.chosenOptionChoice
              );
              if (dishOptionChoice.extraPrice) {
                dishFinalPrice += dishOptionChoice.extraPrice; // DB 기준. 해당 옵션의 고객의 선택지의 추가 가격.
              }
            }
          }
        }

        orderTotalPrice += dishFinalPrice; // 옵션 적용된 각 요리들의 최종 가격 가산.

        const orderItem = await this.orderItemRepo.save(
          this.orderItemRepo.create({
            dish,
            options: item.options, // 고객이 선택한 데이터 그대로 만들 요리 생성.
          })
        );
        orderItems.push(orderItem); // 식당에서 만들고 배달할 요리들 리스트에 추가.
      }

      const order = await this.orderRepo.save(
        this.orderRepo.create({
          customer,
          restaurant,
          items: orderItems, // 요리(DishEntity)+옵션들(OrderItemOption[])로 구성된 주문한 요리들의 배열.
          total: orderTotalPrice,
        })
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Could not create the order." };
    }
  }
}
// ==============================================================
// localhost:3000/graphql
mutation{
  createOrder(input:{
    restaurantId: 1,
    items: [
      {
        dishId: 2,
        options: [
          {
            chosenOption: "spiciness",
            chosenOptionChoice:  "baby-level",
          }, 
          {
            chosenOption: "fast-delivery",
          }
        ]
      },
      {
        dishId: 3,
        options: [
          {
            chosenOption: "portion size"
            chosenOptionChoice: "jumbo",
          }
        ]
      },
    ]
  }){
    ok,
    error
  }
}
// ==============================================================