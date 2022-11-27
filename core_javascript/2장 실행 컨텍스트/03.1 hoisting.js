/*
  호이스팅 hoisting의 이해. (실제 JS의 구동 방식과는 다름)
   - JS는 실제로 코드가 적힌 순서대로 모든 명령들이 실행되지 않음.
   - 우선적으로 hoisting 과정에 따라 식별자 정보를 수집하는 명령들만 실행.
   - 그 외의 명령들은 순차적으로 실행.
*/

// 1. 매개변수와 변수에 대한 호이스팅
// 원본 코드
a = (x) => {
  console.log(x); // 출력: 1
  var x; // 매개변수와 같은 식별자로 지역변수를 선언하더라도 이미 hoisting 발생했음.
  console.log(x); // 출력: 1  - 윗줄의 영향 없음. undefined가 아님!
  var x = 2;
  console.log(x); // 출력: 2
};
a(1);

// 위의 과정에서 매개변수+인자를 변수 선언+할당과 같다고 간주할 경우
b = () => {
  var x = 1; // 수집 대상 1 (매개변수 선언)
  console.log(x); // 1
  var x; // 수집 대상 2 (변수 선언) => 마찬가지로 사전에 hoisting 발생!
  console.log(x); // 1
  var x = 2; // 수집 대상 3 (변수 선언)
  console.log(x); // 2
};
b();

// hoisting을 마친 상태
c = () => {
  var x; // 수집 대상 1의 변수 선언 부분
  var x; // 수집 대상 2의 변수 선언 부분
  var x; // 수집 대상 3의 변수 선언 부분 -- hoisting 완료.

  x = 1; // 수집 대상 1의 할당 부분 -- 그 외의 명령들 순차적으로 실행.
  console.log(x); //  출력: 1
  console.log(x); //  출력: 1
  x = 2; // 수집 대상 3의 할당 부분
  console.log(x); //  출력: 2
};
c();

// ----------------------------------------------
/*
2. 함수 선언의 호이스팅  
- 변수는 선언부와 할당부를 구분하여, 선언부만 수집
  - 즉, 변수에 할당된 값은 올라오지 않음!

- function 키워드 기반 함수 선언은 전체를 수집
  - 즉 함수 내용이 대입된 상태로 전부 다 위로 끌어올리게 됨.
  - 비교) 화살표 함수는 hoisting 과정에서 차이 존재!
*/
// 핵심: undefined가 아님. 아래에서 function이 호이스팅됨.
console.log(c1()); // 출력: 10
function c1() {
  return 10;
}
var c1; // 이미 function이 호이스팅되어서 변수 선언만으로는 아랫줄에 영향 없음.
console.log(c1); // 출력: ƒ c1() { return 10; }
var c1 = 20; // 선언+재할당은 아랫줄에 영향 미침.
console.log(c1); // 출력: 20

// =============================
// 원본 코드.
function a1() {
  // 핵심: undefined가 아님! 아래에서 function이 호이스팅됨!
  console.log(b); // 출력: () => {}

  var b = "bbb"; // 수집 대상 1 (변수 선언) - 재할당은 아랫줄에 영향 미침!
  console.log(b); // 출력: bbb

  function b() {} // 수집 대상 2 (함수 선언) - 사전에 이미 hoisting되므로 아랫줄에 영향 없음!
  console.log(b); // 출력: bbb
}
a1();

// 위의 코드에서 hoisting을 마친 직후의 상태
function b1() {
  var b; //                   수집 대상 1. 변수는 선언부만 끌어올림.
  var b = function b() {}; // 수집 대상 2. 함수 선언은 전체를 끌어올림.

  console.log(b); // 출력: () => {}

  b = "bbb"; // 재할당 작업 수행!
  console.log(b); // 출력: bbb
  console.log(b); // 출력: bbb
}
b1();
