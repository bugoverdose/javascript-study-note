/*
  삼항 연산자 ternary operator
	 - if-else문 간략 버전. 
   - 문자열 string 내부에서 실행하는 압축 조건문. 
 
   형식: condition ? 블록1 : 블록2
    - 블록1: 참인 경우 실행할 블록
    - 블록2: 거짓인 경우 실행할 블록
*/
function underTenSeconds1(seconds) {
  if (seconds < 10) {
    return `0${seconds}초`;
  } else {
    return `${seconds}초`;
  }
}
function underTenSeconds2(seconds) {
  return seconds < 10 ? `0${seconds}초` : `${seconds}초`;
}

console.log(underTenSeconds1(23));
console.log(underTenSeconds2(3));
// 10초 미만인 경우 [01초 02초 03초]처럼 출력, 그 외의 경우 [11초 12초 13초]처럼 출력
// 둘 다 사실상 동일한 기능의 함수. 다만 다른 형식의 조건문.

// ------------------------------------------

const isLoading = true;

if (isLoading) {
  console.log("Loading");
} else {
  console.log("We are ready");
}

console.log(isLoading ? "Loading" : "We are ready");
// isLoading의 값이 true이므로 'Loading' 출력

// ------------------------------------------

const ABC = 123;
console.log(ABC ? "ABC exists" : "ABC does not exist");
// 일반적인 조건문처럼 특정 값의 존재 여부도 조건으로 사용 가능.
