import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const Movie = ({ id, movieName, img, isLiked }) => {
  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id) },
  }); // useMutation은 첫번째 요소에 실핼될 mutation을 반환. likeMovie 등 이름은 자유 지정.
  return (
    <div>
      <Link to={`/${id}`}>
        <h1>{movieName}</h1>
      </Link>
      <button onClick={likeMovie}>{isLiked ? "Unlike" : "Like"}</button>
    </div>
  );
};

export default Movie;
