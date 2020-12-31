/*
console 객체
- window.console과 global.console은 거의 유사함
- 아래 외에도 더 다양한 메서드들 존재.

console.log(내용): 평범한 로그를 콘솔에 표시. 무한하게 인자 받을 수 있음
console.error(에러 내용): 콘솔에 에러 표시

console.time(레이블) - console.timeEnd(레이블)과 대응
- 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정

console.table(배열)
- 배열의 요소로 객체 리터럴을 넣으면, 객체의 속성들이 테이블 형식으로 표현됨

console.dir(객체, 옵션) : 객체를 콘솔에 표시할 때 사용
- 첫번째 인자에 콘솔에 표시할 객체 지정
- 두번째 인자는 옵션. defalt 옵션은 { colors: true, depth: 2 }
- color 옵션 : true로 하면 콘솔에 색 추가되어 가독성 증가.
- depth 옵션 : 객체 안의 객체를 몇 단계까지 보여줄 지를 지정(default 값은 2)

console.trace(레이블)
- 에러가 어디서 발생했는지 추적 가능해짐.
- 에러 메시지에서 에러 발생한 위치가 자동으로 뜨지 않을 때 사용
*/
const string = "abc",
  number = 1,
  boolean = true,
  obj = {
    outside: {
      inside: {
        key: "value",
      },
    },
  };

console.time("전체 시간");

console.log(string, number, boolean);
console.error("에러 메시지");

console.table([
  { fname: "John", lname: "Wick" },
  { fname: "Chris", lname: "Bale" },
]);

console.dir(obj); // defalt 옵션은 { colors: true, depth: 2 }
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time("시간 측정");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}
function a() {
  b();
}
a();

console.timeEnd("전체 시간");
