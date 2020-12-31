/*
  코드가 현재 실행되고 있는 경로를 문자열로 반환
  __filename : 현재 파일명
  __dirname : 현재 디렉토리명

  /, \와 같은 경로 구분자 문제 때문에 대체로 path 모듈과 함께 사용함
*/

console.log(__filename);
// /home/bugod/javascript-study-note/dictionary_node/3__filename, __dirname.js

console.log(__dirname);
// /home/bugod/javascript-study-note/dictionary_node
