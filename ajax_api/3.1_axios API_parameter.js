/*
데이터 가져오는 방법(AJAX / API)
1) fetch
2) axios : fetch 위에서 동작. 

[npm install axios]

const 변수 = axios.get("https://yts-proxy.now.sh/list_movies.json");
- 객체 데이터를 변수로 받아서 그대로 사용. 별도의 작업 불필요.
===========================================
[1] destructuring : 가져온 객체 데이터에서 사용할 변수들만 끄집어내기
[2] parameter : URL?sort_by=value. sort_by 파라미터 추가. rating 기준으로 정렬하여 가져오기
const {
  data: {
    data: { movies },     // 객체데이터.data.data.movies
  },
} = await axios.get(
  "https://yts-proxy.now.sh/list_movies.json?sort_by=rating" 
);
*/
// [App.js]
import React from "react";
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [], // default 값 지정하는 것이 good practice.
  };

  getMovies = async () => {
    // 비동기(async). axios 작업이 끝날 때까지 기다려주고(await) 다음 코드 진행.
    const {
      data: {
        data: { movies }, // axios객체.data.data.movies
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating" // ?sort_by 파라미터 추가. rating 기준으로 정렬하여 가져오기
    );
    // axios로 get 방법으로 API 가져와서 요청 결과 객체를 destructuring.
    this.setState({ movies, isLoading: false }); // state 수정하고 render
  };

  componentDidMount() {
    this.getMovies();
  } // 최초로 컴포넌트가 render되었을 때 (Mounting)

  render() {
    const { isLoading, movies } = this.state; // render할 때만 this.state에서 직접 값 선택.
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text"></span>
          </div>
        ) : (
          <div class="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  title={movie.title}
                  year={movie.year}
                  genres={movie.genres}
                  poster={movie.medium_cover_image}
                  summary={movie.summary}
                />
              );
            })}
          </div>
        )}
      </section>
    ); // isLoading: false가 되면 movies 데이터로 component 동적 생성(map 메서드)
  }
}
export default App;

// ======================================================
// [Movie.js]
import React from "react";
import PropTypes from "prop-types";

const Movie = ({ year, title, summary, poster, genres }) => {
  return (
    <div class="movie">
      <h3 class="movie__title">{title}</h3>
      <h5 class="movie__year">{year}</h5>
      <img src={poster} alt={title} title="ASDSDfg" />
      <h5 class="movie__genres">{genres}</h5>
      <p class="movie__summary">{summary}</p>
    </div>
  );
};
// state가 불필요하므로 function component으로. 인자로는 props 구조분해

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}; // axios객체.data.data.movies의 각 데이터 객체에서 prop으로 받아올 정보 지정.

export default Movie;

// ==========================================================================
/*
YTS의 List Movies API 
- docs: https://yts.mx/api#list_movies
  - parameter들 확인 가능. ex) sort_by rating
* Endpoint: https://yts.mx/api/v2/list_movies.json

YTS는 불법 활동 중이기 때문에 API 주소가 매번 변경됨.
- https://github.com/serranoarevalo/yts-proxy
  : 변경된 주소를 자동으로 우회해서 접근하는 proxy. 100% 동일한 json 
* Endpoint: https://yts-proxy.now.sh/list_movies.json

===========================================
const movies = axios.get("https://yts-proxy.now.sh/list_movies.json");
console.log(movies);

출력: Object
- config: {url: "https://yts-proxy.now.sh/list_movies.json", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
- data:
  - @meta: {server_time: 1611068244, server_timezone: "CET", api_version: 2, execution_time: "0.01 ms"}
  - data:
    - limit: 20
    - movie_count: 25679
    - movies: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    - page_number: 1
    - __proto__: Object
- headers: {cache-control: "max-age=3600, no-store, no-cache, must-revalidate, post-check=0, pre-check=0", content-type: "application/json; charset=utf-8", expires: "Tue, 19 Jan 2021 15:57:24 GMT", pragma: "no-cache"}
- request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
- status: 200
- statusText: ""
- __proto__: Object

=> movies.data.data.movies에 데이터 객체들이 배열로 존재.
*/
