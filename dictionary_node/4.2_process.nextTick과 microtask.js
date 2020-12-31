/*
process.nextTick(콜백함수) : microtask
: 이벤트 루프가 다른 콜백함수들보다 
  nextTick의 콜백함수를 우선적으로 처리하도록 만듬.
: Promise 같은 다른 microtask나 setImmediate보다도 더 먼저 즉시 실행.
*/
setImmediate(() => {
  console.log("immediate"); // 5위
});
process.nextTick(() => {
  console.log("nextTick"); // 1위
});
setTimeout(() => {
  console.log("timeout"); // 4위
}, 0);
Promise.resolve()
  .then(() => console.log("promise1")) // 2위
  .then(() => console.log("promise2")); // 3위
// nextTick
// promise1
// promise2
// timeout
// immediate

// ---------------------------------------------------
/*
마이크로태스크 (microtask)
- process.nextTick
- Promise
: 이벤트루프에서 대기하는 다른 콜백함수들,
  setImmediate, setTimeout(,0) 등보다 먼저 실행됨
: 태스크큐 vs 마이크로태스크 큐

cf) 마이크로태스크의 재귀 호출 (?)
    - 비동기 처리를 할 때 setImmediate보다 process.nextTick을 더 선호할 수 있지만,
    - 마이크로태스크를 재귀호출 할 경우 콜백함수들이 실행되지 않을 수 있음
*/
