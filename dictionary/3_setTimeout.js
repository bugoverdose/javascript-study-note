/*
  setTimeout 함수: 콜백 함수에게 제어권을 넘겨받는 함수
   - setTimeout 함수의 콜백함수의 this는 전역함수
   
  setTimeout(함수A, time);
   - [time]ms만큼 시간 지연 이후 콜백함수 A를 실행시키는 함수.
*/

setTimeout(function () {
  console.log(this);
}, 3000);
// 3000ms 후 전역객체 출력: Window { ... }

// ------------
var coffeeList = "";
var addEspresso = (name) => {
  coffeeList += name;
  console.log(coffeeList);
  setTimeout(addAmericano, 1000, "Americano");
};
var addAmericano = (name) => {
  coffeeList += `, ${name}`;
  console.log(coffeeList);
};
setTimeout(addEspresso, 1000, "Espresso");
// 1000ms 후 출력: Espresso
// 콜백함수 addEspress에 "Espresso"를 인자로 전달하고, 1000ms 후 호출.

/*
  setTimeout(콜백, 0);   
  : 0초 후 콜백함수 실행.
  : Node.js에서 논블로킹 방식으로 코딩하기 위한 기법 중 하나.
  (참고) 실무에서는 setImmediate 등 다른 방식을 더 사용.
  HTML5 브라우저에서는 4ms, Node.js에서는 1ms 정도의 지연시간 존재
*/
function longTask() {
  console.log("A Really Long Task");
}
console.log("Start");
setTimeout(longTask, 0);
console.log("The Next Task");
// "Start"
// "The Next Task"
// "A Really Long Task"

/*
<콜백함수 longtask의 실행순서가 바뀌는 원인 (복습)>
콜스택은 setTimeout의 콜백함수 longtask를 백그라운드로 보내고,
백그라운드는 0초 후에 longTask를 태스크큐로 보낸 후,
이벤트루프는 콜스택이 비게 되었을 때 태스크큐의 longTask를 콜스택으로 보냄.
*/
