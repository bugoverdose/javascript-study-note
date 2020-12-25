/* 
   Symbol.for 메서드 
    - 어디서든 접근가능하면서 유일무이한 상수 생성.
    - 인자로 넘어온 문자열을 받고, 전역 심볼공간에 
      해당 값이 이미 있으면 해당 값을 참조하고, 선언되어 있지 않으면 새로 생성. 
*/
(function () {
  var EmptySpace = Symbol.for("EMPTY_SPACE");
  console.log(EmptySpace);
})(); // Symbol(EMPTY_SPACE)
// 기존 전역 심볼공간에 "EMPTY_SPACE"라는 문자열을 지닌 심볼이 없으므로 새로 생성

(function () {
  console.log(Symbol.for("EMPTY_SPACE"));
})(); // Symbol(EMPTY_SPACE)
// 기존 전역 심볼공간에 "EMPTY_SPACE"라는 문자열을 지닌 심볼이 이미 있으므로
// 해당 값 그대로 참조

// ----------------------------------------------------
// <범용적인 부분 적용 함수 구현> 클로저 + Symbol.for 메서드 활용
var partial2 = function () {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== "function") {
    throw new Error("첫번째 인자가 함수가 아닙니다.");
  }
  return function () {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    for (var i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === Symbol.for("EMPTY_SPACE")) {
        partialArgs[i] = restArgs.shift();
      }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};
var _ = Symbol.for("EMPTY_SPACE");

// [활용]
var func2 = function (a, b, c, d, e, f, g, h, i, j) {
  console.log(this, a, b, c, d, e, f, g, h, i, j);
};
var funcPartial2 = partial2(func2, 1, _, _, 4, _, 6, _, 8, _, _);
console.log(funcPartial2(2, 3, 5, 7, 9, 10));
// Window {...} 1 2 3 4 5 6 7 8 9 10

var funcPartial3 = partial2(1, 2, 3);
// '첫번째 인자가 함수가 아닙니다.'

var funcPartial4 = partial2(func2, _, _, _, 4444); // 맨 뒤의 인자들은 _ 생략가능.
console.log(funcPartial4(10, 20, 30, 50, 60, 70, 80, 90, 100));
// Window {...} 10, 20, 30, 4444, 50, 60, 70, 80, 90, 100
