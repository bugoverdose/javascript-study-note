/*
타이머 기능의 함수들
- set~으로 타이머 기능의 함수 실행, clear~로 타이머+함수 실행 취소
- set~은 ID를 return하게 됨.
- const timeout = setTimeout(콜백, ms)처럼 변수에 ID를 할당하고,
  clear~의 인자로 해당 ID를 대입하면 해당 함수 중단 가능.

setTimeout(콜백함수, ms) 
- 일정 시간 지연 후 콜백함수 실행
- clearTimeout(ID)

setInterval(콜백함수, ms)
- 일정 기간을 간격으로 콜백함수 반복 실행
- clearInterval(ID)

setImmediate(콜백함수)
- 콜백함수 즉시 실행
- clearImmediate(ID)
- Node.js에만 존재하는 것으로 추정됨
- setTime(콜백, 0)은 사용 지양. 
- setImmediate(콜백)이 무조건 setTimeout(콜백, 0)보다 먼저 호출되지는 않음.
*/

const timeout = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const timeout2 = setTimeout(() => {
  console.log("실행되기 전에 clear될 것");
}, 3000);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

// ------------------------------

const immediate = setImmediate(() => {
  console.log("즉시 실행");
});

const immediate2 = setImmediate(() => {
  console.log("실행되지 않을 것");
});

clearImmediate(immediate2);
