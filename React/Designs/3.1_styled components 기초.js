/*
  import styled from "styled-components";
  const 컴포넌트명 = styled.태그명`적용할 css 코드`
  
  일반적인 템플릿 리터럴처럼 내부에 JS 코드 사용 가능: `${JS}`
  - 컴포넌트답게 props를 받아서 css 코드로 특정 prop 값 직접 사용 가능.
  - ex) background-image: url(${(props) => props.img});
*/
import React from "../GraphQL Apollo/node_modules/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.img});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, movieName, img }) => {
  return (
    <Container>
      <Link to={`/${id}`}>
        <h1>{movieName}</h1>
        <Poster img={img} />
      </Link>
    </Container>
  );
};

export default Movie;
