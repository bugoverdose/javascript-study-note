/*
   map 메서드: 배열의 각 요소에 대해 콜백함수를 실행하고, 
               그 결과로 새로운 배열을 return하는 메서드

   배열.map(콜백함수)
    - 콜백함수: function(배열의 현재 요소의 value, index) { ~~ }
*/

// to be added - React movie app

// -----------------------

/*
  [세부구조]
   Array.prototype.map(callbackFunc, thisArg)
   - map 메서드의 매개변수는 2가지
      1) callbackFunc: Array의 각 요소에 대해 반복 실행할 콜백함수.
      2) thisArg (선택사항)
       - 콜백함수 내부에서 this로 인식할 대상 지정.
       - 생략하면 콜백함수는 일반적인 함수처럼 this값으로 전역객체 바인딩.
   - Array 배열의 모든 요소들에 대해 순차적으로 콜백함수를 반복 호출.
     콜백함수의 실행결과들로 새로운 배열을 생성하여 return.

   callbackFunc: function(currentValue, index, array) { ~~ }
   - currentValue: 배열의 요소들 중 현재 선택된 값. 
   - index: 현재 값의 index값
   - array: map 메서드의 대상이 되는 배열 자체, 즉 Array (생략가능)
*/
var arr = [10, 20, 30];
var callback = function (currentValue, index) {
  console.log(`currentValue: ${currentValue}, index: ${index}`);
  return currentValue + 5;
};

var newArr = arr.map(callback);
console.log(newArr);
// currentValue: 10, index: 0
// currentValue: 20, index: 1
// currentValue: 30, index: 2
// [15, 25, 35]

// ---------------------------------

// 주의: map메서드에서는 콜백함수의 매개변수들은 순서에 따라 의미가 정해짐.
// 콜백함수의 인자 순서를 틀린 경우 의도와는 다른 배열이 생성됨.
var arr = [10, 20, 30];
var callback = function (index, currentValue) {
  console.log(`currentValue: ${currentValue}, index: ${index}`);
  return currentValue + 5;
};

var newArr = arr.map(callback);
console.log(newArr);
// currentValue: 0, index: 10
// currentValue: 1, index: 20
// currentValue: 2, index: 30
// [5, 6, 7]
