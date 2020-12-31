// (3) 모듈을 사용할 파일
const { odd, even } = require("./var");
const checkNumber = require("./func");
// func 모듈의 checkOddOrEven 함수를 checkNumber라는 함수명으로 사용.

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd; // 대입한 문자열의 길이를 나눈 나머지가 1이면 참
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("Hello"));

// node dictionary_backend/module 실행시,
// "짝수입니다"
// "홀수입니다"
