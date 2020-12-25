/*
  bind 메서드: 인자로 넘겨받은 this와 인수들을 토대로 새로운 함수를 return하는 명령.
  - call 메서드와 기본 형식 동일. 즉시 실행이 아니라 return한다는 점에서 차이.
  - 내부함수나 콜백 함수에 '상위 컨텍스트의 this'를 전달하기 위해 사용 가능.
*/

/*
  함수1 = (a, b, c, d) => { ~~ }
  함수2 = 함수1.bind({thisArg}); // {thisArg} 객체에 this값만 지정. 
  함수2(a1, b1, c1, d1); // 실행할 때는 인자 4개 그대로 받음.
  console.log(함수2.name); // 출력: bound 함수1

  <부분 적용 함수 구현방법> 
  함수3 = 함수1.bind({thisArg}, a, b); // this 값 + 인자1, 인자2 지정.
  함수3(c1, d1); // 실행할 때는 인자3, 인자4만 지정 가능.
  console.log(함수3.name); // 출력: bound 함수1

  cf) thisArg로 null 값 적용시, 현재 실행되는 스코프를 this값으로 지정.
*/
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4); // Window { ... } 1 2 3 4

var bindFunc1 = func.bind({ x: 10 }); // this값만을 지정.
bindFunc1(5, 6, 7, 8); // {x: 10} 5 6 7 8

// 부분 적용 함수
var bindFunc2 = func.bind({ x: 100 }, 50, 60); // this값 + 첫 인자 2개 지정.
bindFunc2(70, 80); // {x: 100} 50 60 70 80
bindFunc2(7, 8); // {x: 100} 50 60 7 8

// thisArg로 null 값 적용시, 현재 실행되는 스코프를 this값으로 지정.
var bindFunc3 = func.bind(null, 10, 20);
bindFunc3(30, 40); // Window {...} 10 20 30 40

// --------------------------------------------------
/*
  특성: 함수.name: bound 함수명
  - bind 메서드를 적용하여 생성된 함수는 name property에 접두어 'bound'가 추가됨.
  - call/apply를 적용한 경우보다 코드 추적하기 용이해짐.
*/
console.log(func.name); // func
console.log(bindFunc1.name); // bound func
