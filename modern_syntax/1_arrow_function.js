/*
  화살표 함수 arrow function  [ES6]
  - 화살표 함수 내부에는 this 값이 아예 없음.
  - 접근하고자 하면 자동으로 스코프체인상 가장 가까운 this에 접근하게 됨
   
  cf) 애초에 실행 컨텍스트를 생성할 때 this 바인딩 과정이 제외됨.
  - 함수로서 호출될 때 this가 무조건 전역객체만을 바라보는 문제를 해결하고자 도입됨.
  - 메서드 내부에서도 별도의 우회방법 없이 상위 스코프의 this를 그대로 활용 가능. 

  (참고) 3장 this/01c 함수 내부에서의 this.txt
*/

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
  실행 코드에서 return만 하는 경우.
  - 화살표 함수의 경우 중괄호 & return 모두 생략 가능.
*/

// 기존문법 : function(매개변수) { return ~~ }
const add3 = function (num1, num2) {
  return num1 + num2;
};
console.log("add3(2, 3) :", add1(2, 3));

// arrow function : (매개변수) => 실행 코드
const add4 = (num1, num2) => num1 + num2;
console.log("add4(2, 3) :", add2(2, 3));
