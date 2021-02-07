/*
  import { gql, useQuery } from "@apollo/client";
  
  gql`~` 형식으로 Query 내용 작성.
  => useQuery의 인자로 대입하면 해당 query 실행.

  const { loading, error, data } = useQuery(GET_MOVIES);
  - loading : 로딩중일 때 true. query 요청 완료시 false로 전환.
  - error : undefined => 에러발생시 내용 담김.
  - data : query 요청 결과. GraphQL API로 가져온 데이터.  
         : 처음에는 undefined이기 때문에 data 존재여부 확인 작업 필요.
*/
import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  {
    movies {
      id
      title
      medium_cover_image
    }
  }
`; // query 정의 형식. => useQuery의 인자로 대입하여 사용.

const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  console.log(loading, error, data);
  // true undefined undefined
  // false undefined {movies: Array(20)}
  if (loading) {
    return "Loading"; // query를 로딩 중일 때 loading은 true.
  }
  if (data && data.movies) {
    return data.movies.map((movie) => (
      <>
        <h1>{movie.title}</h1>
        <div>{movie.id}</div>
        <img src={movie.medium_cover_image} alt={movie.title} />
      </>
    ));
  }
};

export default Home;
