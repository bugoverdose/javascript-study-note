/*
  향상된 객체 리터럴(Enhanced Object Literal)
  - '속성:값'이라는 고정된 형식에서 벗어날 수 있도록 개선된 축약 문법.
  - 코드의 양을 줄이기 위해 도입됨.
*/
// (1) 속성명과 (값으로 대입하는) 변수명이 같으면 1개만 기입 가능.
const language = "javascript",
  framework = "nest.js";

const oldObject = {
  language: language,
  framework: framework,
};

const newObject = {
  language,
  framework,
};
console.log(newObject.language); // "javascript"

// ------------------------------
// (2) 속성으로 함수를 정의할 경우 function 키워드 생략 가능해짐.
const anObject = {
  oldFunction: function () {
    console.log("I am oldFunction");
  },
  newFunction() {
    console.log("I am newFunction");
  },
};
anObject.oldFunction();
anObject.newFunction();

// ------------------------------
// (3) 객체 리터럴 내부에서 동적으로 객체의 속성명을 생성 가능해짐.
const userName = "John"; // Chris, Kate 등 다른 값 지정 가능

const johnObject = {
  [userName + 1]: "first data",
  [userName + 2]: "second data",
  [userName + 3]: "third data",
};
console.log(johnObject.John1); // first data
console.log(johnObject.John2); // second data

// -----------------------------------------------------
// 종합 recap

// Object Literal : 기존 객체 정의 방식
const sayNode = function () {
  console.log("Node");
};

const object1 = {
  sayJS: function () {
    console.log("I am sayJS function");
  },
  sayNode: sayNode,
};

// 객체에 동적으로 속성 추가하는 방법
const name = "PropertyName";
object1["new" + name] = "객체에 동적으로 추가된 속성의 값";
console.log(object1.newPropertyName); // 객체에 동적으로 추가된 속성의 값

// ------------------------------
// Enhanced Object Literal [ES6]
const sayNode = function () {
  console.log("Node");
};
const name = "PropertyName";

const object2 = {
  sayJS: function () {
    console.log("I am sayJS function");
  },
  sayNode,
  ["new" + name]: "객체에 동적으로 추가된 속성의 값",
};
console.log(object2.newPropertyName); // 객체에 동적으로 추가된 속성의 값
