/* 
  setInterval(function, interval) : 특정 함수를 자동으로 반복실행
  매개변수1: 실행할 함수.
  매개변수2: 해당 함수를 실행할 시간 간격. miliseconds 단위. 
*/

function sayHi() {
  console.log("Hi");
}
setInterval(sayHi, 5000);
// sayhi 함수를 5초마다 한번씩 반복 실행. 5초마다 한번씩 "Hi" 출력.
// 새로고침 없이 스크린에 표시하는 내용 업데이트, 특정 함수 실행 등 가능.
