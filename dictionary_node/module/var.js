// (1) 모듈이 될 파일
const odd = "홀수입니다";
const even = "짝수입니다";

module.exports = {
  odd,
  even, // even: even (Enhanced Object Literal)
};
// module.exports = { 함수/변수들을 모아둔 모듈의 내용 }
// 다른 파일에서 var.js 파일을 불러오면 module.exports에 대입된 값 사용 가능해짐.

/*
(위의 내용과 동일 결과)
exports.odd = "홀수입니다";
exports.even = "짝수입니다";
*/
