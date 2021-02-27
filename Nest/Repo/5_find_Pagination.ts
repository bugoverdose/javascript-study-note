/*
  Repo.find 
  - where 옵션: 특정 필드가 특정 값인 데이터들만 찾아오기. find 조건.
  - take 옵션: 처음으로 보이는 몇 개의 데이터만 보여줄지.
  - skip 옵션: 보여주지 않고 스킵할 데이터 개수. take를 시작하는 기준 설정.

  cf) nest에도 pagination 패키지도 존재

  findOne - relations 옵션의 문제점: 연결된 모든 데이터를 찾아오게 됨.
  - 수백개의 데이터를 매번 가져오게 됨 => pagination 필요.
*/
@Injectable()
export class RestaurantService {
  // ~~
  async findCategoryBySlug({
    slug,
    page, // 직접 입력 안하면 1 자동대입. { defaultValue: 1 }
  }: CategoryInputDto): Promise<CategoryOutputDto> {
    const category = await this.categoryRepo.findOne({ slug });
    // 비교) findOne - relations 옵션의 문제점: 연결된 모든 데이터를 찾아오게 됨.
    if (!category) {
      return { ok: false, error: 'The given category does not exist.' };
    }

    const restaurants = await this.restaurantRepo.find({
      where: { category }, // category 필드의 값이 찾아온 CategoryEntity와 일치하는 데이터들만 가져오기.
      take: 25, // 첫 25개의 데이터만 찾기.
      skip: (page - 1) * 25, // ex) 2pg면 25개 스킵 => 26~50번째 데이터
    }); // pagination : 일부 RestaurantEntity 데이터들만 구체적으로 찾기.

    const totalResults = await this.countRestaurants(category); // 해당 카테고리와 연결된 음식점 수.
    // restaurant DB에서 category 필드의 값이 인자로 대입된 CategoryEntity와 일치하는 데이터의 수.
    const totalPages = Math.ceil(totalResults / 25);
    return { ok: true, category, restaurants, totalPages };
  }

  countRestaurants(category: CategoryEntity) {
    return this.restaurantRepo.count({ category }); // Repo.count: Counts entities that match given options
  } // restaurant DB에서 category 필드의 값이 인자로 대입된 CategoryEntity와 일치하는 데이터의 수.
}
// ==========================================================
// [category.dto.ts]
@ObjectType() // 다른 DTO를 상속하여 DTO를 생성하려는 경우 양쪽에 필요
export class CategoryOutputDto extends PaginationOutputDto {
  // totalPages?: number;

  @Field((type) => [RestaurantEntity], { nullable: true })
  restaurants?: RestaurantEntity[];

  @Field((type) => CategoryEntity, { nullable: true })
  category?: CategoryEntity; // 에러 발생시 null 가능. DB에서 해당 카테고리 못 찾는 경우.
}
// ==========================================================
// http://localhost:3000/graphql
query {
  findCategoryBySlug(input: {
    page:2,
    slug: "hamburgers-fries-coke"
  }){
    ok,
    error,
    totalPages,
    category{
      name,
      restaurantCount,
    },
    restaurants {
      id,
      name
    }
  }
}
{
  "data": {
    "findCategoryBySlug": {
      "ok": true,
      "error": null,
      "totalPages": 2,
      "category": {
        "name": "hamburgers fries coke",
        "restaurantCount": 27
      },
      "restaurants": [
        {
          "id": 32,
          "name": "McDonalds - Korean29"
        },
        {
          "id": 33,
          "name": "McDonalds - Korean30"
        }
      ]
    }
  }
}
// ==========================================================
// 비교) findOne - relations 옵션
@Injectable()
export class RestaurantService {
  // ~~
  async findCategoryBySlug({
    slug,
  }: CategoryInputDto): Promise<CategoryOutputDto> {
    const category = await this.categoryRepo.findOne(
      { slug },
      { relations: ['restaurants'] }, // restaurants 필드에 해당 카테고리와 연결된 모든 음식점 데이터 접근 가능.
    );
    console.log(category);
  }
}
// ==========================================================
