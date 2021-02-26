/*
  양쪽 모두 연결된 Entity 데이터가 없어도 되는 옵션. => Many쪽에 설정.
   {
    nullable: true, 
    onDelete: 'SET NULL', 
   }
   // Many: 카테고리 데이터 없이 restaurant 데이터 생성시, null 담김.
   // One: 음식점 데이터 없는 category 데이터 생성시, 빈 배열이 담김.

        <One>          <Many> 
      category1 --- restaurant1
                --- restaurant2
                --- restaurant3       
      category2 ---      X        // category2.restaurants === []      
         X      --- restaurant4   // restaurant4.category === null
    (@OneToMany)    (@ManyToOne)  
*/
// [restaurant.entity.ts]
@InputType('RestaurantInputType', { isAbstract: true })  
@ObjectType()  
@Entity()  
export class RestaurantEntity extends CoreEntity {
  // ~~
  @Field((type) => CategoryEntity, { nullable: true }) // GraphQL // 연결된 category 데이터가 없어도 되도록 즉, category 삭제시, 연결된 Restaurants 삭제되지 않도록.
  @ManyToOne((type) => CategoryEntity, (category) => category.restaurants, {
    nullable: true, // 양쪽 모두 연결된 Entity 데이터가 없어도 되는 옵션. 
    onDelete: 'SET NULL',  // 나중에 반대쪽에서 해당 필드에 Entity 데이터 대입하면 값 생성됨.
  }) // TypeOrm - 연결된 카테고리 데이터 삭제되도 이쪽 restaurant 데이터는 그대로 유지되도록.
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
CategoryEntity {
  id: 3,
  createdAt: 2021-02-26T12:16:41.884Z,
  updatedAt: 2021-02-26T12:16:41.884Z,
  name: 'hamburgers fries coke',
  coverImg: null,
  slug: 'hamburgers-fries-coke',
  restaurants: []
}

CategoryEntity {
  id: 3,
  createdAt: 2021-02-26T12:16:41.884Z,
  updatedAt: 2021-02-26T12:16:41.884Z,
  name: 'hamburgers fries coke',
  coverImg: null,
  slug: 'hamburgers-fries-coke',
  restaurants: [ 3 ]
}

RestaurantEntity {
  id: 7,
  createdAt: 2021-02-26T12:27:25.958Z,
  updatedAt: 2021-02-26T12:27:25.958Z,
  name: 'McDonalds - Korean4',
  coverImg: 'http://img-address',
  address: 'Seoul SeochoGu',
  category: null,
  owner: 2,
  ownerId: 2
}