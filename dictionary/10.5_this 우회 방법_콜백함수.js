/*
  객체의 메서드를 콜백함수로 사용하는 경우,
   기본적으로 콜백함수는 자신이 속했던 객체를 this로 볼 수 없게 됨.

  콜백함수는 함수이기 때문에 기본적으로 콜백함수의 this값은 전역객체 
   다만, 제어권을 넘겨받은 함수가 콜백함수의 this 값을 지정한 경우 해당 값.
 
  <콜백함수로 사용한 메서드가 자신이 속한 객체를 this로 사용하는 방법들>
   (1) 전통적인 방법: this값을 다른 변수 self에 할당하여 사용. (무시)
   (2) bind 메서드 활용: 콜백 함수 내부의 this에 다른 값 바인딩.
*/

// bind로 this값을 지정
var obj1 = {
  name: "obj1",
  func: function () {
    console.log(this.name);
  },
};
setTimeout(obj1.func.bind(obj1), 1000); // obj1을 this값으로 지정
// obj1 (1초 후 출력)

var obj2 = { name: "obj2" };
setTimeout(obj1.func.bind(obj2), 1500); // obj2를 this값으로 지정
// obj2 (1.5초 후 출력)
