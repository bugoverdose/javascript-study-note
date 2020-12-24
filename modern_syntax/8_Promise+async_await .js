/*
  async/await
  1) 비동기 작업을 수행하고자 하는 함수 앞에 async를 표기
  2) 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 await 표기
  => Promise의 then과 유사한 효과
     : 자동으로 뒤의 내용을 Promise로 전환하고,
       해당 내용이 resolve 된 이후에 다음으로 진행.
*/
var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 1000);
  });
};

var coffeeMaker = async function () {
  var coffeeList = "";
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? "," : "") + (await addCoffee(name));
  };
  await _addCoffee("에스프레소");
  console.log(coffeeList);
  await _addCoffee("아메리카노");
  console.log(coffeeList);
  await _addCoffee("카페모카");
  console.log(coffeeList);
  await _addCoffee("카페라떼");
  console.log(coffeeList);
};

coffeeMaker();
// 에스프레소                                    (1000ms 후 출력)
// 에스프레소, 아메리카노                        (2000ms 후 출력)
// 에스프레소, 아메리카노, 카페모카              (3000ms 후 출력)
// 에스프레소, 아메리카노, 카페모카, 카페라떼    (4000ms 후 출력)
