/*
  함수 표현식: 익명함수를 변수에 할당하는 것이 가장 안전함.
  함수 선언식: 함수명을 정의하면서 선언하는 것은 위험함. (hoisting 문제)
*/
// 함수 표현식
const name1 = function (x, y) {
  return x + y;
};
const name2 = (x, y) => x + y;
name2(1, 2); // 출력: 3
// 상대적으로 안전함. 변수 선언 부분만 끌어올려지고, 변수 할당 부분은 남게 됨.

// 함수 선언식
function name3(x, y) {
  return x + y;
}
// 위험함. 함수 내용 전체가 위로 끌어올려짐. 동명 함수 복수 선언시,
// 마지막 내용으로 전부 다 덮어쓰여짐 + 에러 메시지도 출력되지 않음.

//-------------------------------------------------------
// 접근권한 제어. 클로저와 return
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer(); // inner 함수 할당.
console.log(outer2()); // 2
console.log(outer2()); // 3
// outer의 지역변수 a: 1 => 2 => 3. 전역스코프에서 접근 + 조작 가능.
/*
  > outer 함수는 전역스코프, 즉 외부로부터 철저하게 격리된 닫힌 공간.
  > 외부에서는 노출되어 있는 outer 함수를 실행할 수만 있을 뿐,
    outer 함수 내부에는 어떠한 개입도 할 수 없음. 
    다만, 지역변수 a와 같이 outer 함수가 return한 정보에는 접근 + 변경 가능
  
  > outer 함수에서 inner함수를 return하기 때문에
    outer 함수의 지역변수인 a의 값을 외부에서도 읽을 수 있게 됨.
  > 즉, 함수 내부의 특정 변수들을 return함으로써 외부 스코프에서의 접근 권한 부여 가능.

  참고: 5장 클로저/03b 접근 권한 제어(정보 은닉).txt
*/
// ------------------------------------------------------
/* 
  함수 function : 특정한 기능을 수행하는 코드. 원하는 만큼 사용할 수 있는 부품.
  내장함수 built-in function : alert 함수, console객체의 log, error, info, warn 등
  함수가 인자(argument)를 받아들일 수 있도록 준비시키는 것이 바로 매개변수(parameter) 
*/
function sayHello(name) {
  console.log("hello " + name); // 매개변수(parameter): name
}
sayHello("nico", 15); // 인자(argument): nico, 15
sayHello("john");
sayHello("jack");
// sayHello함수는 매개변수를 1개만 설정 => 1번째 인자만 받을 수 있음. 두번째 인자 15는 무시됨.
// sayHello 함수로 2가지 인자 모두 보내지지만, 함수쪽에서 받아들일 준비가 되어있지 않기 때문에 2번째 인자는 무시됨.

function sayAge(name, age) {
  console.log(`My name is ${name} and I am ${age} years old`);
}
sayAge("nico", 33);
sayAge("john", 28);
// 인자 2개를 매개변수 2개로 받을 수 있게 됨.
// console.log 함수의 경우 argument를 얼마든지 받아들일 수 있음. 매개변수 무한하게 받도록 설정됨.
// 템플릿 리터럴: 백틱(`), ${변수}

// --------------------------------------------

/* return (ft. console.log) */

// 1) 함수에서 아무것도 return하지 않는 경우: return되는 값이 없다면, 함수의 실행결과를 다른 변수에 대입 불가.
function noReturn(name, age) {
  console.log(`Hello ${name} you are ${age} years old.`);
}
const greetNico = noReturn("Nicolas", 5); // 변수 greetNico에 대입되는 값은 없음. 즉시 noReturn 함수의 값을 return, 즉 console.log 함수 실행.
console.log("without return :", greetNico); // undefined 출력됨

// 2) 함수에서 return하는 경우 : return한 데이터를 변수에 대입하여 활용 가능.
function sayHello2(name, age) {
  return `Hello ${name} you are ${age} years old.`;
}
const greetNico2 = sayHello2("nico", 33); // greetNico2변수에 "Hello nico you are 33 years old."라는 값이 대입됨
console.log("with return :", greetNico2); // console에 값 출력됨

// --------------------------------------------
// [완벽한 요약]
function theName(firstParameter, secondParameter) {
  console.log(firstParameter);
  return secondParameter;
}

returnedValue = theName("abc", 123);
console.log(returnedValue);
// "abc"는 theName 호출시 즉시 출력.
// 123은 returnedValue에 담긴 다음에 출력.

// --------------------------------------------

// 예시: calculator라는 변수에 plus, minus 등 함수들로 구성된 객체 대입.
const calculator = {
  plus: function (a, b) {
    return a + b;
  },
  minus: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    return a / b;
  },
  power: function (a, b) {
    return a ** b;
  },
};

const a = calculator.plus(5, 5); // calculator 객체의 key=plus인 함수 실행하여 값 return받고 변수 a에 대입.
const b = calculator.minus(5, 5);
const c = calculator.multiply(5, 5);
const d = calculator.divide(5, 5);
const e = calculator.power(3, 4);
console.log(a, b, c, d, e);
