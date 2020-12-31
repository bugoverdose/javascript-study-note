/*
Node.js의 this와 브라우저의 this의 차이
- Node.js에서 최상위 스코프에 존재하는 this는 module.exports를 가리킴.
- 함수 선언문 내부의 this는 global 전역객체를 가리킴.
*/
console.log(this); // {}
console.log(this === global); // false
console.log(this === module.exports); // true
console.log(this === exports); // true

function whatIsThis() {
  console.log(this === global, this === module.exports); // true false
}
whatIsThis();
