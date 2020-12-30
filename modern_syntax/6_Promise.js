/* 핵심 구조
Promise: 즉시 실행하지만, 결과값은 실행이 완료된 후 then, catch 메서드를 통해 나중에 받는 객체.
- Node.js의 API들은 콜백 대신 Promise 기반으로 재구성됨

1단계) 프로미스 객체 생성: new Promise
- 프로미스 객체는 resolve와 reject를 매개변수로 하는 콜백함수 지정

2단계) 프로미스 객체에서 then과 catch 메서드 사용
- resolve 호출시 then 실행. 
  : resolve에 넣어준 인수를 then의 매개변수로 받을 수 있음.
  : resolve(인자) => then(매개변수)
- reject 호출시 catch 실행
  : reject에 넣어준 인수를 catch의 매개변수로 받을 수 있음.
  : reject(인자) => error(매개변수)
- finally는 무조건 실행. 성공/실패 여부와 상관없이 실행됨.

3단계) then/catch 실행 후 다른 then/catch 실행 가능 
- 이전 then의 return 값을 다음 then의 매개변수로 넘기게 됨.
=> then에서 new Promise를 return하면 프로미스 수행된 후에 다음 then/catch 호출. 
- 콜백함수 내부에 new Promise가 구현된 경우(내부적으로 Promise 객체를 가지고 있는 경우)에 사용법 더 간단해짐
- 각각의 콜백함수에서 매번 따로 에러를 처리할 필요 없이 
  마지막에 catch 메서드 하나만 사용해도 모든 에러 처리 가능.
*/
const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});
// 다른 코드들 실행 가능
promise
  .then((message) => {
    console.log(message); // message == '성공' // resolve(인자) => then(매개변수)
  })
  .catch((error) => {
    console.log(error); // error == '실패' // reject(인자) => error(매개변수)
  })
  .finally(() => {
    console.log("무조건");
  });
// "성공"           // const condition = false면 "실패" 출력
// "무조건"

// ------------------------------
// .then().then().then().catch()
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message); // message == '성공' // resolve(인자) => then(매개변수)
    }); // then에서 message를 다시 resolve하기 때문에 다음 then에서 message2로 받게 됨
  })
  .then((message2) => {
    console.log(message2); // message2 == message == '성공' // resolve(인자) => then(매개변수)
    return new Promise((resolve, reject) => {
      resolve(message2);
    }); // then에서 message2를 다시 resolve하기 때문에 다음 then에서 message3로 받게 됨
  })
  .then((message3) => {
    console.log(message3); // message3 == message2 == message == '성공'
  })
  .catch((error) => {
    console.log(error); // error == '실패' // reject(인자) => error(매개변수)
  });
// "성공"           // console.log(message2);
// "성공"           // console.log(message3);

// const condition = false; ==> "실패" 1회 출력

// ------------------------------------------------------
// ------------------------------------------------------
/*
  Promise : 비동기적인 작업을 동기적으로 표현. [ES6]
  - Node.js의 API들은 콜백 대신 Promise 기반으로 재구성됨

  new Promise의 인자로 넘겨주는 콜백함수는 호출시 즉시 실행.
  - 해당 콜백함수 내부에 resolve 혹은 reject 함수를 호출하는 구문의 경우,
    둘 중 하나가 실행된 이후에 then 혹은 catch 구문으로 넘어가게 됨.
    - then은 다음 함수.
    - catch는 오류 구문.
*/

// then의 중첩사용 가능. 콜백지옥 해결
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
// (비교) 콜백 지옥. Promise가 등장한 원인. 위와 동일한 코드. 가독성 낮음.
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
