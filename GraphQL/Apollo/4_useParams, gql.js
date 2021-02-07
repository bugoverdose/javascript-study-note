import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// param으로 받은 id 값을 query에서 사용하기 위한 추가 작업.
// apollo에서 $id라는 값으로 사용하도록 설정.
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id: +id } });
  if (loading) {
    return "Loading...";
  }
  if (data && data.movie) {
    return (
      <>
        <h1>{data.movie.title}</h1>
        <img src={data.movie.medium_cover_image} alt={data.movie.title} />
      </>
    );
  }
};

export default Detail;
