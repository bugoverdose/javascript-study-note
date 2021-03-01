/*
  반대쪽 Entity에서 서로에 대해 접근하고 싶은 경우에만 반대쪽에 inverse 설정 필요.

  @ManyToOne에서 상대방 필드 어디에 해당 Entity가 담길지 설정 불필요. 
  - 반대쪽 Entity에 아예 @OneToMany 생성 불필요?
*/
@InputType("OrderItemInputType", { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class OrderItemEntity extends CoreEntity {
  @Field((type) => RestaurantEntity) // GraphQL
  @ManyToOne(
    (type) => DishEntity, // inverse 고려 불필요 => 반대쪽에서 연결된 이쪽에 접근할 필요가 없음.
    { onDelete: "CASCADE", nullable: true } // 반대쪽의 DishEntity가 삭제되면 이쪽에 연결된 OrderItem 데이터들도 자동 삭제.
  ) // TypeOrm - 참고: @ManyToOne는 디폴트값이 {nullable: true} 생략 가능
  dish: DishEntity;
}
