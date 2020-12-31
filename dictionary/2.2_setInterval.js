/* 
  setInterval(function, interval) : 특정 함수를 자동으로 반복실행
    매개변수1: 실행할 함수.
    매개변수2: 해당 함수를 반복 실행할 시간 간격. miliseconds 단위.
    
  callback 함수를 인자로 넘겨받는 함수의 대표적인 예시
*/

function sayHi() {
  console.log("Hi");
}
setInterval(sayHi, 5000);
// sayhi 함수를 5초마다 한번씩 반복 실행. 5초마다 한번씩 "Hi" 출력.
// 새로고침 없이 스크린에 표시하는 내용 업데이트, 특정 함수 실행 등 가능.

// --------------------------------------------
/*
  세부 구조: var intervalID = scope.setInterval(func, delay[, param1, param2, ...]);
  - scope는 Window 객체 혹은 Worker의 인스턴스. 
    일반적인 브라우저 환경에서는 window 생략해서 일반 함수처럼 사용.

  - 매개변수 3가지
    func: 실행할 함수.
    delay: miliseconds 단위의 숫자. func 함수는 매 delay 밀리초마다 반복 실행됨.
    나머지(param1, param2, ...): func함수를 실행할 때 매개변수로 전달할 인자. (선택사항)

  - setInterval함수를 변수에 할당하면 clearInterval 활용해서 반복실행 중 종료 가능해짐.
*/
var count = 0;
var callbackFunc = () => {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};
var timer = setInterval(callbackFunc, 300);
// 0 (0.3초)
// 1 (0.6초)
// 2
// 3
// 4 (1.5초)

console.log(count); // 전역객체의 count 값을 직접 증가시킨 것이기 때문에 setInterval 외부에서도 결과 그대로 반영됨.
// 5
// default로 전역객체 window가 scope값으로 지정되었기 때문임.
// setInterval(~,~) == window.setInterval(~,~)
