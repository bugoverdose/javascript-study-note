/*
  @ManyToOne - { onDelete: "CASCADE"} 옵션
  => 반대쪽(One) 데이터가 삭제되면 이쪽에 연결된 모든 데이터들(Many) 자동 삭제.

  @ManyToOne는 디폴트값이 {nullable: true}
  - { onDelete: "CASCADE", nullable: false } 
     => 해당 Entity 생성될 때 연결할 상대방쪽(One) Entity 입력 필수로 적용.
*/
// [dish.entity.ts]
@InputType("DishInputType", { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class DishEntity extends CoreEntity {
  // ~~
  @Field((type) => RestaurantEntity) // GraphQL
  @ManyToOne(
    (type) => RestaurantEntity, // 이쪽 DB에 저장될 연결된 데이터의 타입.
    (restaurant) => restaurant.menu, // 연결된 이쪽의 DishEntity 데이터들이 반대쪽 DB에서 담기는 필드.
    { onDelete: "CASCADE", nullable: false } //  반대쪽의 restaurant가 삭제되면 이쪽에 연결된 모든 dish 데이터들도 자동 삭제.
  ) // TypeOrm - 주의: @ManyToOne는 디폴트값이 {nullable: true} => dish 생성시, restaurant값을 필수로 받을려면 nullable: false 적용 필수.
  restaurant: RestaurantEntity; // 여러 dish는 하나의 restaurant에만 연결됨.

  @RelationId((dish: DishEntity) => dish.restaurant) // TypeOrm 목적. // GraphQL - @Field 불필요.
  restaurantId: number; // 내부참조: DB상 관계id가 담기게 되는 필드의 값을 복사해오는 필드.
}
// ==================================
// [restaurant.entity.ts]
@InputType("RestaurantInputType", { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class RestaurantEntity extends CoreEntity {
  // ~~
  @Field((type) => [DishEntity]) // GraphQL
  @OneToMany((type) => DishEntity, (dish) => dish.restaurant) // TypeOrm
  menu: DishEntity[]; // 여러 restaurant는 하나의 category에만 연결됨.
}

// =================================================================
// =================================================================
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
// ==================================
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
