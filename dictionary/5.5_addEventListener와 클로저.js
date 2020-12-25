/*
  addEventListener의 콜백함수를 
  외부로 분리시켜서 사용하려는 경우 고차함수를 활용해야 함. (4) 클로저 발생
  => 익명함수를 사용한 경우와 동일하게 동작하게 됨. (1) 클로저 발생

  (비교) bind 메서드 사용시 다소 문제점 존재함. (클로저 발생하지 않음)
  
  원인: addEventListener는 콜백함수 호출시, 첫번째 인자에 이벤트 객체 대입됨.
        즉, 외부에서 불러들이는 콜백함수에 원하지 않은 값들이 인자로 대입됨.
  
  참고. 5장 클로저/03a 콜백 함수와 클로저.txt
*/
// (1) 익명 콜백함수 사용한 경우
var fruits = ["사과", "바나나", "복숭아"];
var $ul = document.createElement("ul");

fruits.forEach(function (fruit) {
  var $li = document.createElement("li");
  $li.innerText = fruit;

  $li.addEventListener("click", function () {
    alert(`your choice is ${fruit}`);
  });
  $ul.appendChild($li);
});
document.body.appendChild($ul);
// 브라우저의 '사과'를 클릭하면 "your choice is 사과" 출력
// 브라우저의 '바나나'를 클릭하면 "your choice is 바나나" 출력

// ------------------------------
/*
  (2) 콜백함수 alertFruit를 외부로 분리시켜서 사용하려는 경우
  - addEventListener는 콜백함수 호출시, 첫번째 인자에 이벤트 객체 대입.
  - 콜백함수(alertFruit) 호출시 addEventListener는 
      첫번째 인자인 fruit에 외부변수 fruit((A)의 매개변수)이 아니라,
      이벤트 객체[object MouseEvent]를 대입하게 됨. 
*/
var fruits = ["사과", "바나나", "복숭아"];
var $ul = document.createElement("ul");

var alertFruit = function (fruit) {
  alert(`your choice is ${fruit}`); // (B)
};

fruits.forEach(function (fruit) {
  // (A)
  var $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruit); // (B)
  $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
// 브라우저 로딩 끝나면 "your choice is 바나나" 출력
// 브라우저의 '사과'를 클릭하면 "your choice is [object MouseEvent]" 출력
/*
  (B) alertFruit 함수
   - 콜백함수로 넘겨지기 이전에는 전역스코프에 정의된 일반적인 함수.
   - (A)의 매개변수 fruit을 인자로 받을 수 있도록 매개변수로 fruit 설정.

  [버그 발생 원인]
  addEventListener에 alertFruit를 콜백함수로 넘겨주는 순간, 
  콜백함수에 대한 제어권은 addEventListener가 지니게 됨.
  => addEventListener는 콜백함수 호출시, 첫번째 인자에 '이벤트 객체'를 주입하게 됨.
  즉, 콜백함수로 사용된 순간 alertFruit의 매개변수 fruit에는 이벤트 객체 [object MouseEvent]가 자동으로 대입됨.
*/

// ------------------------------
/* 
   (3) bind 메서드를 통한 문제 해결: alertFruit.bind(null, fruit))
      - 클로저가 발생하지 않게 됨.
      - 제약: 이벤트 객체가 인자로 넘어오는 순서가 바뀌게 됨.
              함수 내부의 this값이 기존과 달라지게 됨.
*/
var fruits = ["사과", "바나나", "복숭아"];
var $ul = document.createElement("ul");

var alertFruit = function (fruit) {
  alert(`your choice is ${fruit}`);
};

fruits.forEach(function (fruit) {
  var $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruit.bind(null, fruit));
  $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
// 브라우저 로딩 끝나면 "your choice is 바나나" 출력
// 브라우저의 '사과'를 클릭하면 "your choice is 사과" 출력
// 브라우저의 '바나나'를 클릭하면 "your choice is 바나나" 출력

// ------------------------------
/* 
  (4) 고차함수를 통한 문제 해결
   - 기존의 익명함수를 그대로 return하는 고차함수를 콜백함수로 사용.
   - 클로저를 적극적으로 활용.
   (alertFruitBuilder의 실행결과로 반환되는 익명함수에는 클로저가 존재하게 됨.)
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
