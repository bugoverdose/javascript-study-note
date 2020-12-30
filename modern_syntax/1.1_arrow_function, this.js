/*
화살표함수를 사용하면 this값을 통해 그대로 상위 컨텍스트에 접근 가능
 
  화살표 함수 내부에는 this 값이 아예 없음. (=전역객체를 바라보지 않음)
  - 화살표함수 내부에서 this값에 접근하고자 하면
    자동으로 스코프체인상 가장 가까운 this인 상위컨텍스트의 this값에 접근하게 됨
  - 즉, 화살표함수는 상위스코프의 this를 자동으로 물려받게 됨 

cf) 애초에 실행 컨텍스트를 생성할 때 this 바인딩 과정이 제외됨.
  - 함수로서 호출될 때 this가 무조건 전역객체만을 바라보는 문제 해결시켜줌.
    
  (참고) core_javascript/3장 this/01c 함수 내부에서의 this.txt
         NodeJS/2장/2.1 최신 JS문법
*/

// (1) 일반적인 함수에서는 우회 없이 직접 this값 사용 불가. this 값이 달라짐.
var object1 = {
  name: "john",
  friends: ["A", "B", "C"],
  logFriends1: function () {
    this.friends.forEach(function (friend) {
      // this = object1
      console.log(this.name, friend); // this = 전역객체 Window
    });
  },
};
object1.logFriends1();
// A
// B
// C

// -------------------------

// (1-1) forEach문 내부에서 상위스코프의 this값을 사용하기 위한 우회방법.
var object1 = {
  name: "john",
  friends: ["A", "B", "C"],
  logFriends1: function () {
    var self = this;
    this.friends.forEach(function (friend) {
      // this = object1;
      console.log(self.name, friend); // self = object1 // this = 전역객체
    });
  },
};
object1.logFriends1();
// john A
// john B
// john C

// -------------------------

// (2) 화살표함수는 상위 스코프의 this 값을 그대로 물려받음.
// 상위 스코프인 logFriends2()의 this 값을 forEach 내부에서 그대로 사용 가능.
var object2 = {
  name: "john",
  friends: ["A", "B", "C"],
  logFriends2() {
    this.friends.forEach((friend) => {
      // this == object2.
      console.log(this.name, friend); // this == object2.
    });
  },
};
object2.logFriends2();
// john A
// john B
// john C
