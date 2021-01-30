/*
var: globally scoped => 전역객체에 저장됨.
let, const [ES6] : block scoped => 전역객체에 저장되지 않음.

[const & let vs var: 스코프 종류가 서로 다름]
- const, let은 블록 스코프를 지님. 블록 밖에서는 변수에 접근 불가. 
              => 호이스팅 문제 해결+ 코드 관리 수월해짐
- var은 함수 스코프를 지님. if문의 블록과 관계없이 접근 가능.

cf) 블록의 범위는 {중괄호 사이}.
*/
if (true) {
  var x = 3;
  const y = 3;
  let z = 3;
}
console.log(x); // 3
console.log(y); // 에러 (Uncaught ReferenceError: y is not defined)
console.log(z); // 에러 (Uncaught ReferenceError: z is not defined)

//----------------------------------------------
let data;
const func1 = () => {
  data = 1;
};
func1();
const func2 = () => {
  console.log(data);
  data = 2;
  console.log(data);
};
func2();
// 1
// 2

//----------------------------------------------
// const의 에러들

// const: 한번 값을 할당하면 다른 값을 할당할 수 없음. (1) 다른 값 할당하려고 하면 에러 발생.
//        const로 선언한 변수는 '상수'. (2) 최초에 선언,초기화할 때 값을 할당하지 않아도 에러 발생
const a = 0;
a = 1; // 에러(1) Identifier 'a' has already been declared
const b; // 에러(2) Missing initializer in const declaration => 매우 안전함.

//let: 다른 값 할당 가능. 초기화할 때 값 할당하지 않아도 에러 발생하지 않음
let a = 0;
a = 1;
let b;
