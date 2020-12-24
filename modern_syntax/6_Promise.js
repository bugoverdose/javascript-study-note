/*
  Promise : 비동기적인 작업을 동기적으로 표현. [ES6]
  
  new Promise의 인자로 넘겨주는 콜백함수는 호출시 즉시 실행.
  - 해당 콜백함수 내부에 resolve 혹은 reject 함수를 호출하는 구문의 경우,
    둘 중 하나가 실행된 이후에 then 혹은 catch 구문으로 넘어가게 됨.
    - then은 다음 함수.
    - catch는 오류 구문.
*/
new Promise(function (resolve) {
  setTimeout(function () {
    var name = "에스프레소";
    console.log(name);
    resolve(name);
  }, 1000);
})
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ", 아메리카노";
        console.log(name);
        resolve(name);
      }, 1000);
    });
  })
  .then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ", 카페라떼";
        console.log(name);
        resolve(name);
      }, 1000);
    });
  });
// 에스프레소                       (1000ms 후 출력)
// 에스프레소, 아메리카노           (2000ms 후 출력)
// 에스프레소, 아메리카노, 카페라떼 (3000ms 후 출력)

// -----------------------
// Promise + 클로저 활용.
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var newName = prevName ? `${prevName}, ${name}` : name;
        console.log(newName);
        resolve(newName);
      }, 1000);
    });
  };
};
addCoffee("에스프레소")()
  .then(addCoffee("아메리카노"))
  .then(addCoffee("카페모카"))
  .then(addCoffee("카페라떼"));

// 에스프레소
// 에스프레소, 아메리카노
// 에스프레소, 아메리카노, 카페모카
// 에스프레소, 아메리카노, 카페모카, 카페라떼

// -------------------------------------------
// 비교: 콜백 지옥. Promise가 등장한 원인. 위와 동일한 코드. 가독성 낮음.
setTimeout(
  function (name) {
    var coffeeList = name;
    console.log(coffeeList);
    setTimeout(
      function (name) {
        coffeeList += `, ${name}`;
        console.log(coffeeList);
        setTimeout(
          function (name) {
            coffeeList += `, ${name}`;
            console.log(coffeeList);
          },
          1000,
          "CafeLatte"
        );
      },
      1000,
      "Americano"
    );
  },
  1000,
  "Espresso"
);
// Espresso                       (1000ms 후 출력)
// Espresso, Americano            (2000ms 후 출력)
// Espresso, Americano, CafeLatte (3000ms 후 출력)
