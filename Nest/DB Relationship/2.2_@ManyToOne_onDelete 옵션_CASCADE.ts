/*
  @ManyToOne - { onDelete: "CASCADE"} 옵션
  => 반대쪽(One) 데이터가 삭제되면 연결된 모든 데이터들(Many) 자동 삭제.
*/
// [restaurant.entity.ts]
@InputType("RestaurantInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class RestaurantEntity extends CoreEntity {
  // ~~
  @Field((type) => UserEntity) // GraphQL - 음식점은 주인이 존재해야 함.
  @ManyToOne((type) => UserEntity, (user) => user.restaurants, {
    onDelete: "CASCADE", // 연결된 User가 사라지면 모든 음식점 데이터들도 자동 삭제.
  })
  owner: UserEntity; // 여러 restaurant는 하나의 owner(주인인 User)에만 연결됨.
}

// =================================================================
// [user.entity.ts]
@InputType("UserInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class CategoryEntity extends CoreEntity {
  // ~~
  @Field((type) => [RestaurantEntity]) // GraphQL식 배열 표현.
  @OneToMany((type) => RestaurantEntity, (restaurant) => restaurant.owner) // TypeOrm
  restaurants: RestaurantEntity[]; // 주인(사용자)는 복수의 restaurant와 연결됨.
}

// =================================================================
