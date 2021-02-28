/*
  @ResolveField로 생성. Resolver가 반환하는 entity의 자녀 필드로 생성됨.
  - @ResolveField가 꾸미는 함수의 이름이 필드명. 반환하는 값이 필드의 값.
  - @Parent를 통해 dynamic field가 생성되는 entity에 접근 가능.
  
  ==================================================================
  computed field 혹은 dynamic field 
  - GraphQL Resolver에서 계산되는 필드. (유연성)
  - DB에 실제로 저장되지는 않는 필드. TypeORM Entity에 존재하지 않는 필드. 
  - GraphQL Entity에 생성됨. GraphQL Schema에서만 확인 가능(playground).
  - "request depending field" : request를 보낼 때마다 값이 계산되는 필드.
  
  주로 사용자의 state에 따라 계산되는 필드 생성할 때 사용.
  ex) 게시물에 좋아요 누른 사용자는 isLiked: true
      게시물에 좋아요 안누른 사용자는 isLiked: false
*/
// [restaurants.resolver.ts]
@Resolver((of) => CategoryEntity) // dynamic field 생성 기준.
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField((type) => Number) // dynamic field - CategoryEntity의 자녀 필드로 생성.
  restaurantCount(@Parent() category: CategoryEntity): Promise<number> {
    // @Parent() : restaurantCount 필드의 부모인 CategoryEntity에 접근.
    return this.restaurantService.countRestaurants(category);
  } // 각 category 데이터에 대해 restaurantCount 필드 생성 + countRestaurants 실행 결과를 값으로 대입.

  @Query((returns) => AllCategoriesOutputDto)
  allCategories(): Promise<AllCategoriesOutputDto> {
    return this.restaurantService.allCategories();
  }
}
// =====================================
// [restaurants.service.ts]
@Injectable()
export class RestaurantService {
  // ~~
  countRestaurants(category: CategoryEntity) {
    return this.restaurantRepo.count({ category }); // Repo.count: Counts entities that match given options
  } // restaurant DB에서 category 필드의 값이 인자로 대입된 CategoryEntity와 일치하는 데이터의 수.
}
// ===============================================================
// Playground : localhost:3000/graphql
query {
  allCategories{
    ok,
    error,
    categories{  // @Parent()로 접근되는 각 CategoryEntity들
      name,
      slug,
      restaurantCount
    }
  }
}

{
  "data": {
    "allCategories": {
      "ok": true,
      "error": null,
      "categories": [
        {
          "name": "fried chicken",
          "slug": "fried-chicken",
          "restaurantCount": 1
        },
        {
          "name": "hamburgers and fries",
          "slug": "hamburgers-and-fries",
          "restaurantCount": 1
        },
        {
          "name": "hamburgers fries coke",
          "slug": "hamburgers-fries-coke",
          "restaurantCount": 4
        }
      ]
    }
  }
}