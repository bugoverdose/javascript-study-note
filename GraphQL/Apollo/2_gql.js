/*
  import { gql } from "@apollo/client";
  
  gql`~` 형식으로 실행할 Query의 내용 작성.
  => useQuery의 인자로 대입하면 해당 query 실행.  
  
  기본적으로 Playground에서 작성한 형식을 기초로 함.
  1) 실행할 query명 & {} 내부에 요청할 세부 데이터들의 fields 설정. 
  2) param으로 받은 값을 query에서 사용하도록 설정 가능. 
     - query getMovie($id: Int!)
     - $변수명 형식 & 스키마에서 지정한 방식과 동일하게 정의 필요(타입 & required 여부(!))
  3) 한번에 복수의 query 요청 가능 => data에 복수의 query 요청 결과가 한번에 담김.
*/
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIES = gql`
  {
    movies {
      id
      title
      medium_cover_image
    }
  }
`; // => const { loading, data } = useQuery(GET_MOVIES);

// 1) param으로 받은 id 값을 query에서 사용하기 위한 추가 작업.
// apollo에서 id를 $id라는 값으로 사용하도록 설정.
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      rating
      description_intro
      language
      medium_cover_image
    }
    suggestions(id: $id) {
      title
      medium_cover_image
      rating
    }
  }
`;
// 2) const { loading, data } = useQuery(GET_MOVIE, { variables: { id: +id } });
// => data.movie & data.suggestions // data에 복수의 query 요청 결과가 담기게 됨.

const Detail = () => {
  const { id } = useParams();
  // const { loading, data } = useQuery(GET_MOVIES);
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id: +id } });
  return (
    <div>
      <div>
        {
          <>
            <div>{loading ? <div>Loading...</div> : data?.movie?.title}</div>
            <div>
              {data?.movie?.language} {!loading && "·"} {data?.movie?.rating}
            </div>
            <div>{data?.movie?.description_intro}</div>
          </>
        }
      </div>
      <div img={data?.movie?.medium_cover_image}></div>

      {data?.suggestions?.map((s) => (
        <div>s</div>
      ))}
    </div>
  );
};

export default Detail;
