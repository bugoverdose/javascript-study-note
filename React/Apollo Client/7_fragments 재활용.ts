/*
 gql문에서 특정 타입의 특정 부분이 반복되는 경우.
 
 [설정 방법]
  1) src 폴더 내부에 fragments.ts 파일 생성.
  1-1) apollo.config.js에서 해당 파일도 apollo codegen 대상으로 설정. (client - includes)
  2) "RestaurantEntity 타입의 일부분인 RestaurantParts fragment" 형식으로 정의.
  
   export const RESTAURANT_FRAGMENT = gql`
     fragment RestaurantParts on RestaurantEntity {~~}
   `  
   // RestaurantEntity 부분이 중요.
  
 [사용 방법]
  1) gql문 맨 아래에 ${RESTAURANT_FRAGMENT} 형식으로 사용할 fragment 추가.
  2) ...RestaurantParts 형식으로 해당 타입 사용.
*/
// [fragments.ts] RestaurantEntity 타입의 일부라는 점만 명시 필요.
import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantParts on RestaurantEntity {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

// ==================================================
// [search.tsx]에서 사용하는 경우
const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInputDto!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      searchResult {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

// ==================================================
// [search.tsx]에서 사용하지 않는 경우. 위와 동일한 gql문
const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInputDto!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      searchResult {
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

// ==================================================
// apollo.config.js
module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"], // src 폴더 내부의 모든 폴더들의 .tsx/.ts 파일들 찾기. 폴더 내부의 폴더들도 다 찾음.
    tagName: "gql", // gql`` 형식의 graphql문들을 대상으로 함.
    service: {
      name: "uber-eats-backend", // 이름은 자유 지정.
      url: "http://localhost:4000/graphql", // 백엔드 graphql url
    },
  }, // includes에 지정된 파일들에서 사용된 gql``에 대해 관련 TS definition을 제공. // 즉, 모든 스키마를 전부 다 import해오지 않음. 사용하는 것들만 가져옴.
}; // excludes: 디폴트로 **/node_modules & **/__tests___는 포함되지 않음.

// ==================================================
