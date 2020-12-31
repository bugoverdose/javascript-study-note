// (2) 모듈을 사용하고, 모듈이 될 파일
const { odd, even } = require("./var");
// require(불러올 모듈의 경로)
// Object destructuring
// ./var == .(현재 디렉토리)의 var.js 파일

function checkOddOrEven(num) {
  if (num % 2) {
    return odd; // 2로 나눈 나머지가 1이면 true => 홀수 return하면서 if문 전체 종료.
  }
  return even;
}
module.exports = checkOddOrEven;
// module.exports = 함수
// 다른 파일에서 func.js 파일을 불러오면 module.exports에 대입된 값 사용 가능해짐.
