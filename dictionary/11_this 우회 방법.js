/*
  내부함수나 콜백 함수에 '상위 컨텍스트의 this'를 전달하는 방법
   - self 변수 사용보다 call, apply, bind 메서드를 통해 더 쉽게 우회 가능.
   
  화살표 함수는 함수 내부에 this값이 아예 없음. 스코프체인상 가장 가까운 this에 접근하게 됨.
*/

// 화살표 함수: 가장 효율적.
var obj = {
  outer: function () {
    console.log(this); // {outer: f}
    var innerFunc = () => {
      console.log(this); // {outer: f}
    };
    innerFunc();
  },
};
obj.outer();

// call
var obj1 = {
  outer: function () {
    console.log(this); // {outer: f}
    var innerFunc = function () {
      console.log(this); // {outer: f}
    };
    innerFunc.call(this);
  },
};
obj1.outer();

// bind
var obj2 = {
  outer: function () {
    console.log(this); // {outer: f}
    var innerFunc = function () {
      console.log(this); // {outer: f}
    }.bind(this);
    innerFunc();
  },
};
obj2.outer();

// bind. 콜백함수
var obj3 = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 1000);
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 3000);
  },
};
obj3.logThisLater1(); // Window {...} // 전역객체
obj3.logThisLater2(); // {logThis: ƒ, logThisLater1: ƒ, logThisLater2: ƒ}
