/*
  Generator 함수 : 비동기적인 작업을 동기적으로 표현. [ES6]
  - function*(){}의 형식

  Generator 함수를 실행하면 Iterator가 반환됨. (Iterator는 next 메서드를 지님)
  - next 메서드를 호출하면 Generator 함수 내부에서 최초로 등장하는 yield에서 함수의 실행을 멈춤.
  - 다시 next 메서드를 호출하면 멈춘 부분부터 다시 함수 실행, 다시 yield에서 함수 실행 멈춤.
  
  즉, 각각의 비동기 작업이 완료되는 시점마다 next 메서드를 호출하면 
      Generator 함수 내부의 코드들은 위에서 아래로 순차적으로 진행됨.
*/
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? `${prevName}, ${name}` : name);
  }, 1000); // 1000초마다 next 메서드 반복실행.
};
var coffeeGenerator = function* () {
  var espresso = yield addCoffee("", "에스프레소");
  console.log(espresso);
  var americano = yield addCoffee(espresso, "아메리카노");
  console.log(americano);
  var mocha = yield addCoffee(americano, "카페라떼");
  console.log(mocha);
  var latte = yield addCoffee(mocha, "카페라떼");
  console.log(latte);
};

var coffeeMaker = coffeeGenerator();
coffeeMaker.next(); // 최초로 next 메서드 실행.
// 에스프레소                                    (1000ms 후 출력)
// 에스프레소, 아메리카노                        (2000ms 후 출력)
// 에스프레소, 아메리카노, 카페모카              (3000ms 후 출력)
// 에스프레소, 아메리카노, 카페모카, 카페라떼    (4000ms 후 출력)
