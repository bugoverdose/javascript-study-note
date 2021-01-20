/*
PropTypes
- 특정 컴포넌트가 제대로 된 prop들을 전달받고 있는지 확인하는 방법. 
- prop 전달 관련 실수 예방. 실수한 경우 브라우저 콘솔에서 Warning 확인 가능.
  ex) 잘못된 데이터타입을 전달, isRequired인데 누락, prop명 실수 등 
- https://reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper

[npm i prop-types]

// prop을 전달받을 컴포넌트의 propTypes 속성에 configure.
Component.propTypes = {
	prop1: PropTypes.데이터타입, 
    prop2: PropTypes.데이터타입.isRequired, 
    prop3: PropTypes.arrayOf(PropTypes.데이터타입).isRequired,
}
*/

import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}; // axios객체.data.data.movies의 각 데이터 객체에서 prop으로 받아올 정보 지정.

const Movie = ({ year, title, summary, poster, genres }) => {
  // state가 불필요하므로 function component으로. 인자로는 props 구조분해
  return (
    <div class="movie">
      <h3 class="movie__title" style={{ backgroundColor: "red" }}>
        {title}
      </h3>
      <h5 class="movie__year">{year}</h5>
      <img src={poster} alt={title} title={title} />
      <h5 class="movie__genres">{genres}</h5>
      <p class="movie__summary">{summary}</p>
    </div>
  );
};

export default Movie;
