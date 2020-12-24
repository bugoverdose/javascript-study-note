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
