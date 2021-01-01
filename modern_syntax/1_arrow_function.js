/*
<화살표 함수(arrow function)>
- function 선언 대신 '=>'로 함수 선언.
- 내부에 코드가 1줄밖에 없는 경우, 중괄호도 생략 가능.
- return문밖에 없으면 return 키워드도 생략 가능.
*/
const add1 = (x, y) => {
  return x + y;
};
const add2 = (x, y) => x + y; // return문만 있으면 중괄호와 return 생략 가능.
const add3 = (x, y) => x + y;
const not1 = (x) => !x; // 매개변수 1개면 (소괄호) 생략 가능

// --------------------------------------------------------

// 기존 문법(함수 선언식) : function 함수명(매개변수) { 실행 코드 }
function theName1(firstParameter, secondParameter) {
  console.log(firstParameter);
  return secondParameter;
} // 위험한 함수 정의 방법.

// arrow function : 함수명 = 매개변수 => { 실행 코드 }
theName2 = (firstParameter, secondParameter) => {
  console.log(firstParameter);
  return secondParameter;
};

result1 = theName1("abc", 123);
result2 = theName2("def", 456);
console.log(result1, result2);

// -----------------------------------------------
/*
  함수 표현식(익명 함수를 변수에 할당)과의 비교.
*/

// 기존문법 : function(매개변수) { 실행 코드 }
const add1 = function (num1, num2) {
  return num1 + num2;
};
console.log("add1(2, 3) :", add1(2, 3));

// arrow function : (매개변수) => { 실행 코드 }
const add2 = (num1, num2) => {
  return num1 + num2;
};
console.log("add2(2, 3) :", add2(2, 3));

// -----------------------------------------------
/*
  즉시실행함수
*/
// 기존문법 : function(매개변수) { 실행 코드 }
console.log(
  (function (num1, num2) {
    return num1 + num2;
  })(3, 5)
);

// arrow function : (매개변수) => { 실행 코드 }
console.log(
  ((num1, num2) => {
    return num1 + num2;
  })(3, 5)
);

//  -----------------------------------------------------------------
/*
  실행 코드에 return문밖에 없는 경우.
  - 화살표 함수의 경우 중괄호 생략 & return 생략 가능.
*/

// 기존문법 : function(매개변수) { return ~~ }
const add3 = function (num1, num2) {
  return num1 + num2;
};
console.log("add3(2, 3) :", add1(2, 3));

// arrow function : (매개변수) => 실행 코드
const add4 = (num1, num2) => num1 + num2;
console.log("add4(2, 3) :", add2(2, 3));
