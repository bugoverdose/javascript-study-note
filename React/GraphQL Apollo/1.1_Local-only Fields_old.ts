/*
  [기존 방식] 
  - 직접 gql문 작성 & useQuery로 설정된 local only field에 접근.
*/
// Apollo GraphQL 익스텐션 : gql문 작성 보조 기능.

// 1) ApolloClient의 cache에 typePolicies 옵션으로 local only field 설정.
// [apollo.ts]
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            // local only field명: isLoggedIn
            read() {
              return false;
            }, // read 메서드: 해당 isLoggedIn 필드에 담기는 값을 return
          },
        },
      },
    },
  }),
});
// ==============================================================
// 2) gql문 작성 & useQuery로 설정된 local only field에 접근.
// [App.tsx]
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { LoggedOutRouter } from "./routers/logged-out-router";

const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;
// query isLoggedIn는 선택 사항. isLoggedIn과 달라도 가능. (query potato 등)
// isLoggedIn는 ApolloClient에서 설정한 state명과 동일하도록.
// @client : client cache에 요구. 서버에 요구하지 않도록 설정.

function App() {
  const { data } = useQuery(IS_LOGGED_IN); // query 결과의 data 객체에 read함수 실행 값 담김.
  console.log(data); // {isLoggedIn: false}
  return <LoggedOutRouter />;
}

export default App;
// ==============================================================
