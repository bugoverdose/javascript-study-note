/*
  Repo.findAndCount
  1) 찾아진 Entity들(객체 데이터들)의 배열 반환
  2) DB에 존재하는 전체 데이터 수 반환
  - take 옵션: 첫번째 인자에 담을 데이터들의 수.
  - skip 옵션: 보여주지 않고 스킵할 데이터 개수. take를 시작하는 기준 설정.

  cf) nest에도 pagination 패키지도 존재
*/
@Injectable()
export class RestaurantService {
  // ~~
  async findAllRestaurants({
    page,
  }: FindAllRestaurantsInputDto): Promise<FindAllRestaurantsOutputDto> {
    try {
      const [
        restaurants, // 찾아진 Entity 데이터들의 배열. (take & skip 반영)
        totalResults, // 실제로 DB에 존재하는 전체 데이터의 수.
      ] = await this.restaurantRepo.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalPages = Math.ceil(totalResults / 25);
      return { ok: true, results: restaurants, totalPages, totalResults };
    } catch (e) {
      return { ok: false, error: 'Failed to Load Restaurants.' };
    }
  }
}
// ==========================================================
// [find-restaurants.dto.ts]
@InputType() // => MappedType으로 dto로 dto 생성도 가능.
export class FindAllRestaurantsInputDto extends PaginationInputDto {
  // page: number; // { defaultValue: 1 }
}

@ObjectType()
export class FindAllRestaurantsOutputDto extends PaginationOutputDto {
  // totalPages?: number;
  // totalResults?: number;

  @Field((type) => [RestaurantEntity], { nullable: true })
  results?: RestaurantEntity[]; // 음식점 데이터들 못 찾으면 null 가능.
}

// ==========================================================
// http://localhost:3000/graphql
query{
  findAllRestaurants(input: {
    page:2
  }){
    ok,
    error,
    totalPages,
    totalResults,
    results{
      id,
      name
    }
  }
}

{
  "data": {
    "findAllRestaurants": {
      "ok": true,
      "error": null,
      "totalPages": 2,
      "totalResults": 32,
      "results": [
        {
          "id": 27,
          "name": "McDonalds - Korean24"
        },
        {
          "id": 28,
          "name": "McDonalds - Korean25"
        },
        {
          "id": 29,
          "name": "McDonalds - Korean26"
        },
        {
          "id": 30,
          "name": "McDonalds - Korean27"
        },
        {
          "id": 31,
          "name": "McDonalds - Korean28"
        },
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
