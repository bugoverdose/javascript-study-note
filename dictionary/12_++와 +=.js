/*
  Increment(++)  
  - ++변수 : 해당 변수에 1을 더하고, 더해진 후의 값을 return.
  - 변수++ : 변수의 현재 값을 return하면서, 해당 변수에 1을 더하기.
*/
let idNumbers = 0;
const newId1 = idNumbers;
idNumbers += 1;
// newId1 : 0
// idNumbers : 1

let idNumbers = 0;
const newId2 = idNumbers++;
// newId2 : 0
// idNumbers : 1

let idNumbers = 0;
const newId3 = ++idNumbers;
// newId3 : 1
// idNumbers : 1

// ===========================================================

let a = 3;
const b = ++a;
console.log(`a:${a}, b:${b}`);
// "a:4, b:4"

let x = 3;
const y = x++;
console.log(`x:${x}, y:${y}`);
// "x:4, y:3"

// ---------------------

/*
  ++변수: 조건문의 조건 내에서 값을 1 증가시키면서, 증가된 값을 조건으로 활용
*/
var count = 0;
var callbackFunc = () => {
  console.log(count);
  if (++count > 4) clearInterval(timer); // count값을 1 증가. 증가된 결과가 4보다 크면 clearInterval로 timer 함수 종료.
};
var timer = setInterval(callbackFunc, 300); // clearInterval로 반복실행 종료 위해 변수에 할당
// 0 (0.3초)
// 1 (0.6초)
// 2
// 3
// 4 (1.5초)

// ----------------------------------------------------

/*
  Addition assignment (+=)
    형식: x += y 
    의미: x = x + y
*/
let a = 2;
console.log((a += 3)); // addition
// 5

let b = "hello";
console.log((b += " world")); // concatenation
// "hello world"
