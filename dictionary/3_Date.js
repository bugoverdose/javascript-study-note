/*
  Date() : 현재 시점 정보를 담은 클래스
    - getHours(), getMinutes() 등의 함수들 사용하여 다양한 방식으로 현재 시점 관련 정보 표현 가능.
*/
const date = new Date();
console.log(date);

const theDate = date.getDate();
console.log(theDate);
const theDay = date.getDay();
console.log(theDay);
const theFullYear = date.getFullYear();
console.log(theFullYear);
const theHours = date.getHours();
console.log(theHours);
const theMilliseconds = date.getMilliseconds();
console.log(theMilliseconds);
const theMinutes = date.getMinutes();
console.log(theMinutes);
const theMonth = date.getMonth();
console.log(theMonth);
const theSeconds = date.getSeconds();
console.log(theSeconds);
const theTime = date.getTime();
console.log(theTime);
const theTimezoneOffset = date.getTimezoneOffset();
console.log(theTimezoneOffset);
const theUTCDate = date.getUTCDate();
console.log(theUTCDate);

// -------------------------------------

/*
  [XX시 XX분 XX초]의 형식으로 현재 시점 정보 출력
  ternary operator를 통해 10보다 작으면 앞에 0 붙이기.
*/
function getTime() {
  const date = new Date(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  const currentTime = `${hours < 10 ? `0${hours}` : hours}시 ${
    minutes < 10 ? `0${minutes}` : minutes
  }분 ${seconds < 10 ? `0${seconds}` : seconds}초`;
  console.log(currentTime);
}

function init() {
  getTime();
  setInterval(getTime, 1000); // 1초마다 해당 함수 자동 실행 (자동 업데이트)
}
init();
