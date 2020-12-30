/*
[ES6] import/export : 자바스크립트 자체 모듈 시스템 문법
- Node.js의 모듈 시스템과는 다름
- 크롬 60버전 등 브라우저에도 점점 모듈 시스템 지원되고 있음

<모듈 사용 ES6>
import from : Node.js의 require 함수

<모듈 생성 ES6>
export default : Node.js의 module.exports
*/

import { odd, even } from "./var";
// ./var : 사용할 모듈이 위치한 파일 디렉토리
// var 모듈의 객체를 가져와서 odd와 even이라는 함수를 odd, even이라는 변수에 저장.

function checkOddOrEven(num) {
  // 모듈로 사용할 함수 내용
}

export default checkOddOrEven;
// checkOddOrEven 함수를 다른 파일에서도 사용할 수 있도록 모듈 생성.
// export default ~가 최하단에 존재하는 파일은 import 가능한 모듈이 됨.

// ---------------------------------------------
/*
Node.js에서 ES6 모듈 시스템 사용하는 방법
1) 파일의 확장자를 .mjs로 지정.
2) package.json에 type: "module" 속성 지정 + js 확장자 그대로 사용 
*/
