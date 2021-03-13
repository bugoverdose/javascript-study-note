/*
  복수의 Query를 한번에 요청 가능.

  const { data, loading, error } = useQuery<~>(gql``, {variables : { ~ }})
  - variables 옵션에 gql문으로 전달할 데이터 입력.
  - 제네릭에는 gql문 내부에서 정의한 Query명과 동명으로 만들어진 타입들 설정.
    - useQuery<RestaurantsPageQuery, RestaurantsPageQueryVariables>
*/
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { RestaurantsPageQuery } from "../../generated_api_types/RestaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query RestaurantsPageQuery($input: FindAllRestaurantsInputDto!) {
    findAllCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    findAllRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(
    RESTAURANTS_QUERY,
    { variables: { input: { page: currentPage } } } // 보내는 gql문에서 $input에 대입할 인자: {page: currentPage}
  ); // variables에 대입된 {page:currentPage} 값 변화시 자동으로 query 재요청. // 캐쉬에 존재하면 그대로 사용.

  return <h1>Restaurants Page</h1>;
};
