/*
  디바운스(debounce)
  - 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우,
    이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한번만 처리
  - frontend 성능 최적화에 도움을 주는 기능.
  - scroll, wheel, mousemove, resize 등에 적용하기 용이.
  - Lodash 등의 라이브러리 없이도 최소한의 기능은 간단하게 구현 가능.
*/

// 부분 적용함수 + 디바운스
var debounce = function (eventName, func, wait) {
  var timeoutId = null;
  return function (event) {
    var self = this;
    console.log(eventName, "이벤트 발생");
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};
// eventName, func, wait, timeoutId 모두 클로저로 처리됨.

var moveHandler = function (e) {
  console.log("move event 처리");
};
var wheelHandler = function (e) {
  console.log("wheel event 처리");
};
document.body.addEventListener(
  "mousemove",
  debounce("move", moveHandler, 1000)
);
document.body.addEventListener(
  "mousewheel",
  debounce("wheel", wheelHandler, 1500)
);
// "mouse 이벤트 발생" x30번 출력
// "mouse event 처리" 1초 후 출력
// "wheel 이벤트 발생" x50번 출력
// "wheel event 처리" 1.5초 후 출력
