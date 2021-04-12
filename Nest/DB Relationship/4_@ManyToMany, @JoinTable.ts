/*
  다대다 관계의 경우 기본적으로 한쪽에만 @ManyToMany & @JoinTable 설정.
  - @JoinTable는 무조건 한쪽에만 설정.
  - unidirection을 원하면 @ManyToMany를 관계id가 필요한 한쪽에만 설정
  => 자동으로 through table 생성: 연결된 두 entity들의 관계ID 쌍들의 DB
  
  - 비교) 1대1은 한쪽에만 @OneToOne & @JoinColumn 설정. 관계id가 필요한 쪽에 설정.
  
  ManyToMany: 1대다 관계가 양쪽에 적용 가능한 관계.
  - 하나의 주문은 여러 요리로 구성 가능. A contains multiple instances of B.
    => 주문이 어떤 요리들로 구성되었는지 확인 필요 => 관계ID 필요. => @JoinTable()
  - 하나의 요리는 많은 고객들에게 주문 받을 수 있음. B contains multiple instances of A.
    => 어떤 고객들이 해당 요리를 주문했는지는 기본적으로 불필요.
*/
// [order.entity.ts]
export class OrderEntity extends CoreEntity {
  @Field((type) => [OrderItemEntity]) // GraphQL
  @ManyToMany((type) => OrderItemEntity) // TypeOrm - 반대쪽 DishEntity에는 불필요.
  @JoinTable() // TypeOrm - 관계id가 필요한 쪽에만 설정.
  items: OrderItemEntity[]; // 하나의 주문은 여러 요리(OrderItem)로 구성 가능. // 하나의 요리는 많은 고객들에게 주문 받을 수 있음.
}
// ===================================================================
