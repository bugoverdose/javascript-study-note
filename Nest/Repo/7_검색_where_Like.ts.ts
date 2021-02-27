/*
  find - where옵션 & Like 패키지
  - 특정 문구를 받아 DB에서 해당하는 데이터 검색하는 방법. 

  Like('SQL문') 
  - 단점: case-sensitive. 대소문자 구분됨. Chicken !== chicken

  Repo.findAndCount({
    where: { 
      name: Like(`%${"chicken"}%`), // name 필드의 값으로 'chicken'을 포함하는 데이터 찾기.
    },  
    take: 25, 
    skip: (page - 1) * 25, 
  });

  =====================================================================
  Like Clause - SQL문법.
  - WHERE SALARY LIKE '200%' // Finds any values that start with 200.
  - WHERE SALARY LIKE '%200%' // Finds any values that have 200 in any position.
  - WHERE SALARY LIKE '_00%' // Finds any values that have 00 in the second and third positions.
  - WHERE SALARY LIKE '2_%_%' // Finds any values that start with 2 and are at least 3 characters in length.
  - WHERE SALARY LIKE '%2' // Finds any values that end with 2.
  - WHERE SALARY LIKE '_2%3' // Finds any values that have a 2 in the second position and end with a 3.
  - WHERE SALARY LIKE '2___3' // Finds any values in a five-digit number that start with 2 and end with 3.
  - https://www.tutorialspoint.com/sql/sql-like-clause.htm
*/
import { Like } from "typeorm";

@Injectable()
export class RestaurantService {
  async searchRestaurantByName({
    query,
    page,
  }: SearchRestaurantInputDto): Promise<SearchRestaurantOutputDto> {
    try {
      const [
        restaurants, // 찾아진 Entity 데이터들의 배열. (take & skip 반영)
        totalResults, // 실제로 DB에 존재하는 전체 데이터의 수.
      ] = await this.restaurantRepo.findAndCount({
        where: {
          name: Like(`%${query}%`), // name 필드의 값으로 query를 포함하는 데이터 찾기.
        }, // 대소문자 구분됨. Chicken !== chicken
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
