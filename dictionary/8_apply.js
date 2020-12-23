/*
   apply 메서드: 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령.
   - apply 메서드의 첫번째 인자는 this로 바인딩되고, 
   - 두 번재 인자는 배열로 받고,
     배열의 각 요소들은 호출할 함수의 매개변수로 설정됨.
   
  형식: function.prototype.apply(thisArg[, argArray])
      함수.apply({this 객체}, [인자1, 인자2, 인자3, ...]);

  함수.apply({객체}, [a, b, c]); // {객체}는 함수의 this로 바인딩됨.
  객체.메서드.apply({객체}, [a, b, c]); // {객체}는 메서드의 this로 바인딩됨
*/
// --------------------------------------------------

var func1 = function (a, b, c) {
  console.log(this, a, b, c);
};
func1.apply({ x: 1 }, [40, 50, 60]); // {x: 1} 40 50 60
// apply 메서드의 첫번째 인자를 this로 지정.
// 두번째 인자로, 함수의 인자들을 하나의 배열로 묶는다는 점에서만 call과 차이 존재.

var obj = {
  a: 10,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};
obj.method.apply({ a: 100 }, [5, 6]); // 100 5 6
// 마찬가지로 함수로 보낼 인자들을 하나의 배열로 묶어서 apply 메서드의 두번째 인자로 배열을 보냄.

// --------------------------------------------------

// 활용법: 여러 인수를 묶어 하나의 배열로 전달하고 싶을 때
// (예시) 배열에서 최대/최소값을 구하는 방법
var numArray = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numArray);
var min = Math.min.apply(null, numArray);
console.log(max, min); // 45 3
// 여러 인수를 받는 메서드(Math.max/Math.min)에 apply 적용
// this로는 null값 적용.
