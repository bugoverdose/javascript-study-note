/*
  코드가 현재 실행되고 있는 경로를 문자열로 반환
  __filename : 현재 파일 경로
  __dirname : 현재 디렉토리 경로
  
  대체로 path 모듈과 함께 사용.
*/

console.log(__filename);
// /home/bugod/javascript-study-note/dictionary_node/6.1__filename, __dirname.js

console.log(__dirname);
// /home/bugod/javascript-study-note/dictionary_node

// --------------------------------

const keyword = __filename;
console.log(keyword);
