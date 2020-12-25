// 고차함수: 함수를 인자로 받거나, 함수를 return하는 함수.
// 함수형 프로그래밍에서 자주 사용되는 방식

/*
  <다양한 활용법>
  eventListener의 익명 콜백함수를 외부로 빼내고, 
  기존의 익명함수를 그대로 return하는 고차함수를 콜백함수로 사용하는 방법.
  - 클로저를 적극적으로 활용하기 때문에 에러 없음.
  - alertFruitBuilder의 실행결과로 반환되는 익명함수에는 클로저가 존재하게 됨.)
*/
var fruits = ["사과", "바나나", "복숭아"];
var $ul = document.createElement("ul");

var alertFruitBuilder = function (fruit) {
  return function () {
    alert(`your choice is ${fruit}`); // 기존의 익명함수 그대로 return
  };
};

fruits.forEach(function (fruit) {
  var $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruitBuilder(fruits[1]);
// 브라우저 로딩 끝나면 콘솔에 ƒ () {alert(`your choice is ${fruit}`);} 출력.
// 브라우저의 '사과'를 클릭하면 "your choice is 사과" 출력
// 브라우저의 '바나나'를 클릭하면 "your choice is 바나나" 출력
