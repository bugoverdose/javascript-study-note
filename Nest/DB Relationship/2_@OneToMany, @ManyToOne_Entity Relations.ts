/*
        <One>          <Many> 
      category1 --- restaurant1
                --- restaurant2
                --- restaurant3  
    (@OneToMany)    (@ManyToOne)  // TypeORM

  중요: 양쪽 Entity에서 대응되는 필드에 inverse로 상대방 Entity에 대한 정보 적기.
  중요: Many쪽의 필드에 관계id가 하나 담기게 됨.
        One쪽의 필드에는 관계id들의 리스트가 생성되지 않음.

(RestaurantEntity 입장 - Many쪽 entity) - 하나의 음식점은 하나의 카테고리에만 속할 수 있음.
  @Field((type) => CategoryEntity)
  @ManyToOne((type) => CategoryEntity, (category) => category.restaurants) // category의 restaurants 데이터로 연결
  category: CategoryEntity;  // 관계id가 담기게 됨.

(CategoryEntity 입장 - One쪽 entity) - 하나의 카테고리에는 여러 음식점이 속할 수 있음.
  @Field((type) => [RestaurantEntity]) 
  @OneToMany((type) => RestaurantEntity, (restaurant) => restaurant.category) // restaurant의 category 데이터로 연결 
  restaurants: RestaurantEntity[]; // 관계id둘이 담기지 않음.
*/
// [restaurant.entity.ts]
@InputType('RestaurantInputType', { isAbstract: true })  
@ObjectType()  
@Entity()  
export class RestaurantEntity extends CoreEntity {
  // ~~
  @Field((type) => CategoryEntity) // GraphQL
  @ManyToOne((type) => CategoryEntity, (category) => category.restaurants) // TypeOrm
  category: CategoryEntity; // 여러 restaurant는 하나의 category에만 연결됨.
}

// =================================================================
// [category.entity.ts]
@InputType('CategoryInputType', { isAbstract: true }) 
@ObjectType()  
@Entity()  
export class CategoryEntity extends CoreEntity {
  // ~~
  @Field((type) => [RestaurantEntity]) // GraphQL식 배열 표현.
  @OneToMany((type) => RestaurantEntity, (restaurant) => restaurant.category) // TypeOrm
  restaurants: RestaurantEntity[]; // category는 복수의 restaurant와 연결됨.
}

// =================================================================
// [app.module.ts]
@Module({
  imports: [
    // ~~
    TypeOrmModule.forRoot({
      // ~~
      entities: [CategoryEntity, RestaurantEntity],
    }),   
  ], 
})
export class AppModule implements NestModule {~~}

// =================================================================
