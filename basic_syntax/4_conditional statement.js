/* if-else문
if (condition) {
  block1; // condition이 참일 때 실행
} else {
  block2;
}

condition은 boolean, 즉 true 혹은 false가 될 수 있는 것
  true == 값이 존재 == 1
  false == 값이 없음 == 0
*/
if (1 == 2) {
  console.log("1 == 2");
} else {
  console.log("1 != 2");
}

/*
else if : 새로운 조건과 블록을 무한하게 추가 가능.
if (condition1) {
  block1;
} else if (condition2) {
  block2;
} else if (condition3) {
  block3;
} else {
  block4;
}
*/
const A = ""; // 빈 문자열은 false
if (A) {
  console.log("A exists");
} else if (A == undefined) {
  console.log("A is undefined");
} else {
  console.log("A == '' :", A == ""); // A == '' : true
}

// -----------------------------------
/*
  == : 동등 연산자. equality operator
  === : 일치 연산자. identity operator
*/
console.log(undefined == null); // true
console.log(undefined === null); // false

// -----------------------------------

// 피연산자 : 여러 조건들을 합치는 기능

// && : And. 두 가지 조건 모두 참이어야 전체가 참.
console.log("true && true :", true && true);
console.log("false && true :", false && true);
console.log("true && false :", true && false);
console.log("false && false :", false && false);

if (20 > 5 && "abc" === "abc") {
  console.log("Both are True");
} else {
  console.log("At least one of them is False");
}
// 출력: Both are True

// || : Or. 두 가지 조건 중 하나만 참이어도 전체가 참. (두 가지 조건 모두 거짓이어야 거짓)
console.log("true || true :", true || true);
console.log("false || true :", false || true);
console.log("true || false :", true || false);
console.log("false || false :", false || false);

// -----------------------------------
// !abc : not abc

if (!true) {
  console.log("false");
} else {
  console.log("true");
}
// !true == false이므로 else문의 block 실행. true 출력.

const a = 10;
if (!(a == 10)) {
  console.log("a is not 10");
} else {
  console.log("a is 10");
}
// !(a == 10)는 (a != 10)이므로 false. 때문에 else문의 block 실행.
// "a is 10" 출력.

const b = "basket";
if (!b == "basket") {
  console.log("not b is basket");
} else {
  console.log("not b is not basket");
}
// "not b is not basket" 출력.

const c = "";
if (!c) {
  console.log("!c exists");
} else {
  console.log("!c does not exist");
}
// c는 존재하지 않으므로, !c는 존재, 즉 참
// 출력: "!c exists"
