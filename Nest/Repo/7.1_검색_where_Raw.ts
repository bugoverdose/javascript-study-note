/*
  Raw() : 직접 SQL문을 입력하여 실행할 수 있게 해주는 typeOrm 연산자. (execute raw query)
  - Raw((필드명)) => `SQL문`) // SQL문 반환. 필드명 활용 가능.

  name: Raw((name) => `${name} ILIKE '%${ChickeN}%'`),
  - name 필드의 값으로 ChickeN을 포함하고 있는 데이터 찾기.
  - ILIKE : case-insensitive : 대소문자 구분X
*/
import { Raw } from "typeorm";

@Injectable()
export class RestaurantService {
  async searchRestaurantByName({
    query,
    page,
  }: SearchRestaurantInputDto): Promise<SearchRestaurantOutputDto> {
    try {
      const [
        restaurants, // 찾아진 Entity 데이터들의 배열. (take & skip 반영)
        totalResults, // 해당 조건에 부합하는 모든 데이터의 수. DB 기준. (take & skip 미반영)
      ] = await this.restaurantRepo.findAndCount({
        where: {
          name: Raw((name) => `${name} ILIKE '%${query}%'`), // name 필드의 값으로 query를 포함하는 데이터 찾기.
        }, // ILIKE : case-insensitive : 대소문자 구분X. ChickeN === chicken // cf) MySQL의 경우, `${name} LIKE BINARY '%${query}%'`
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalPages = Math.ceil(totalResults / 25);
      return {
        ok: true,
        totalResults,
        totalPages,
        searchResult: restaurants,
      };
    } catch (e) {
      return { ok: false, error: "Failed to load the search result." };
    }
  }
}
