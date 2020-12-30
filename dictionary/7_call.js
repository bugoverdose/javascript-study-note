/*
   call 메서드: 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령.
   - call 메서드의 첫번째 인자는 객체로 받아 this로 바인딩되고, 
   - 그 이후의 인자들은 호출할 함수의 매개변수로 설정됨.

형식: function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
      함수.call({this 객체}, 인자1, 인자2, 인자3, ...);
*/

// --------------------------------------------------
/*
  <함수 호출시>
  함수(a, b, c); // this는 전역객체를 참조.
  함수.call({객체}, a, b, c); // {객체}는 함수의 this로 바인딩됨.
*/
var func1 = function (a, b, c) {
  console.log(this, a, b, c);
};

func1(10, 20, 30); // Window { ... } 10 20 30
// 함수를 그냥 실행하면 this는 전역객체를 참조.

func1.call({ x: 1 }, 40, 50, 60); // {x: 1} 40 50 60
// call 메서드를 통해 함수를 실행하면 첫번째 인자를 this로 지정 가능.

// --------------------------------------------------
/*
  <메서드 호출시>
  객체.메서드(a, b, c); // this는 객체를 참조.
  객체.메서드.call({객체}, a, b, c); // {객체}는 메서드의 this로 바인딩됨.
*/
var obj = {
  a: 10,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method(2, 3); // 10 2 3
// obj.메서드 내부의 this는 객체 obj. (메서드 본인이 담겨있는 객체)
// this.a == obj.a == 10

obj.method.call({ a: 100 }, 5, 6); // 100 5 6
// call 메서드를 통해 실행하면 첫번째 인자가 obj.메서드 내부의 this로 지정됨.
// this.a == {a: 100}.a == 100