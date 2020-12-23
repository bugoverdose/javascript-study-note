// string : 문자열. string of text. 따옴표(")를 통해 여러 문자들을 함께 묶은 것.
/*
  문자열도 배열처럼 index와 length property를 지니기 때문에 
  call/apply 메서드를 활용해서 일부 배열 메서드들 적용 가능.
  다만, length property가 읽기 전용이므로 
       원본 문자열에 변경을 가하는 배열 메서드들은 사용 불가(에러),
       대상이 반드시 배열이어야하는 메서드도 제대로 적용 불가(concat)
*/

// -------------------------------------------------

// Boolean : true / false. true==1, false==0.

// -------------------------------------------------

// Number : 일반적인 숫자.

// -------------------------------------------------

// Float : 소수점을 포함한 숫자. floating number(떠돌이 소숫점). Number와 사실상 동일함.
const a = 20.5;
console.log("a :", a);

// 주의사항: https://velog.io/@sgyoon/2019-09-15-01
console.log(0.1 + 0.2 == 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.3); // 0.29999999999999998
// -------------------------------------------------

// Array : 배열. 대괄호[ ]. array[index]로 특정 요소 지정 가능 (index=0,1,2,...)
const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", true];
console.log("daysOfWeek[2] :", daysOfWeek[2]);
console.log("daysOfWeek[100] :", daysOfWeek[100]);

// -------------------------------------------------

// Object : 객체. 중괄호{ }. 각 요소는 key:데이터로 저장하고 쉼표로 구분. Object.key로 값 선택 가능.
const Info = {
  name: "Nico",
  age: 33,
  gender: "male",
  isHandsome: true,
};
console.log("Info.gender :", Info.gender); // "male" 출력
Info.gender = "female"; // 값 수정. 객체를 const로 변수를 선언했음에도 값 수정됨.
console.log("Info.gender :", Info.gender); // "female" 출력

// 객체를 배열 안에 넣을 수 있고, 배열도 객체 안에 넣을 수 있음.
const nicoInfo = {
  name: "Nico",
  age: 33,
  gender: "male",
  isHandsome: true,
  favMovies: ["Along the gods", "LOTR", "Oldboy"],
  favFood: [
    { name: "Kimchi", fatty: false },
    { name: "Cheese burger", fatty: true },
  ],
};
console.log("nicoInfo.favFood[0].fatty :", nicoInfo.favFood[0].fatty); // 출력: false
// 객체 nicoinfo의 key=favFood인 array의 0번째 객체의 key=fatty의 값

// console.log에서 console도 객체. log 함수는 console 객체의 key
console.log(console);
// log, info 모두 f (함수)
