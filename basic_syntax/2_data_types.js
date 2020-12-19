// string : 문자열. string of text. 따옴표(")를 통해 여러 문자들을 함께 묶은 것.
// Boolean : true / false. true==1, false==0.
// Number : 일반적인 숫자.

// Float : 소수점을 포함한 숫자. floating number(떠돌이 소숫점). Number와 사실상 동일함.
const a = 20.5;
console.log("a :", a);

// -------------------------------------------------

// Array : 배열. 대괄호[ ]. array[index]로 특정 요소 지정 가능 (index=0,1,2,...)
const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun", true];
console.log("daysOfWeek[2] :", daysOfWeek[2]);
console.log("daysOfWeek[100] :", daysOfWeek[100]);

// -------------------------------------------------

// Object : 객체. 중괄호{ }. 각 요소는 key:데이터로 저장하고 쉼표로 구분. Object.key로 지정 가능.
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
