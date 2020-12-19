/*
  event: 이벤트는 웹사이트에서 발생하는 사건들. click, resize, submit 등.
  - JavaScript로 '이벤트를 설정'하는 것이 아님.
  - 특정 이벤트 발생시, 특정 함수가 실행되도록 설정하는 것. 
  - 다룰 수 있는 모든 이벤트 종류: https://developer.cdn.mozilla.net/it/docs/Web/Events 
*/

/* 
[Event Handling]
  객체.addEventListener(이벤트, 함수)    
  - 매개변수1: 다룰 이벤트 설정 
  - 매개변수2: 이벤트 발생시 실행할 함수

  ex) window.addEventListener(이벤트, 함수)    
  - window 객체: 해당 웹사이트가 열린 브라우저 창에 대한 이벤트를 handle하는 데 사용.
*/

function handleResize() {
  console.log("I have been resized");
}
window.addEventListener("resize", handleResize);
/*
  1) 사전에 이벤트를 다룰 함수를 선언. 
  2) addEventListener: window가 resize되는 이벤트 발생시 handleResize 함수를 호출하도록 설정.
  브라우저 창의 크기를 변경하는 이벤트("resize")가 발생할 때마다, 콘솔에 "I have been resized" 출력

  [중요] handleResize()가 아니라, handleResize로 입력
  handleResize(): 코드가 읽힌 시점에 즉시 함수를 실행. 이벤트 발생하기 전에 실행.
  handleResize : 필요한 시점에 함수를 호출. => 이벤트 발생했을 때 실행.
*/

// ------------------------------------------

const consoleElement2 = document.querySelector("#console");
const BASE_COLOR = "rgb(100, 200, 0)";
const OTHER_COLOR = "rgb(200, 200, 200)";

function handleClick() {
  consoleElement2.innerHTML = "I have been changed by 5_events.js";
  const currentColor = consoleElement2.style.color;
  if (currentColor == BASE_COLOR) {
    consoleElement2.style.color = OTHER_COLOR;
  } else {
    consoleElement2.style.color = BASE_COLOR;
  }
  console.log("Done");
}

function init() {
  consoleElement2.style.color = BASE_COLOR; // 초기 글자색 설정
  consoleElement2.addEventListener("click", handleClick);
}
init();
/* 
  consoleElement2 객체는 click 이벤트를 기다림.
  id=console인 h1 element에 대해 click 이벤트 발생시 handleClick함수가 자동 실행되도록 설정.
  클릭할 때마다 조건문에 따라 색깔 변화.
*/

// ------------------------------------------

/*
다양한 이벤트들
- title.addEventListener("click", handleClick);  : title객체에 해당하는 내용을 클릭했을 때 함수 실행
- title.addEventListener("mouseenter", handleClick); : title객체에 해당하는 내용에 마우스 포인터가 닿았을 때 함수 실행

- 인터넷 연결이 끊겼을 때 특정 함수가 실행되도록 이벤트 설정. 
function handleOffline() {
    console.log("Wifi is Off");
}
window.addEventListener("offline". handleOffline);

/*
  이벤트 객체 확인 방법 (form 제작 등에서 참고 가능)
  - 이벤트를 다룰 함수를 선언하면 해당 함수에는 자동으로 이벤트 객체가 붙게 됨.
*/
const btn = document.querySelector(".btn");
function handleClick2(event) {
  console.log(event);
}
btn.addEventListener("click", handleClick2);
// 해당 버튼을 클릭할 때마다 MouseEvent 객체가 콘솔에 출력됨.
// MouseEvent 객체의 조작 가능한 key들 확인 가능.
