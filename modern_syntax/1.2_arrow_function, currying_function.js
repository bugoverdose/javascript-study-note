/*
  커링 함수 currying function
  - 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서
    순차적으로 호출될 수 있도록 체인형태로 구성한 것. 
  - 화살표 함수로 가독성 높게 구현 가능.
  
  [참고: 5장 클로저/03d 커링 함수.txt]

  1) 매개변수가 대체로 비슷하고 일부만 변하는 경우에 사용
  2) 지연실행(lazy execution)이 필요할 때 사용.
*/
// currySexy와 curryVerbose는 동일한 내용

var currySexy = (func) => (a) => (b) => (c) => (d) => (e) =>
  func(a, b, c, d, e);

var curryVerbose = function (func) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return func(a, b, c, d, e);
          };
        };
      };
    };
  };
};

var getMax5 = curryVerbose(Math.max);
console.log(getMax5(8)(10)(20)(30)(50)); // 50

var getmin5 = curryVerbose(Math.min);
console.log(getmin5(8)(10)(20)(30)(50)); // 8
