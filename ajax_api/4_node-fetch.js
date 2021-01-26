/*
  fetch : 브라우저. 자바스크립트 자체 메서드.
  node-fetch : 서버. 설치 및 import 필요. 
             : https://www.npmjs.com/package/node-fetch
  
  => 사용하지 말기!! 
 */
// [npm i node-fetch]

import fetch from "node-fetch";

const API_URL = "https://yts-proxy.now.sh/list_movies.json/";

export const getMovies = () => {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((json) => json.data.movies);
};
