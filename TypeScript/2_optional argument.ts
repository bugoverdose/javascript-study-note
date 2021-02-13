/*
  기본적으로 함수의 매개변수는 전부 required. 
  - 모든 인자를 전달하지 않으면 Problems & 빨간줄이 뜸 (컴파일은 가능)
  - 마우스를 가져다 대면 문제 확인 가능

  [optional argument]
  - 변수? : 특정 변수명 뒤에 ?를 붙이면 not required 설정 적용. (TS 기능)
    ex) gender?: string
*/
const sayHello1 = (name: string, age: number, gender: string) => {
  console.log(`Hello! ${name}! You are ${age} and ${gender}!`);
};
sayHello1("Nicolas", 24); // Hello! Nicolas! You are 24 and undefined!

const sayHello2 = (name: string, age: number, gender?: string) => {
  console.log(`Hello! ${name}! You are ${age} and ${gender}!`);
};
sayHello2("Nicolas", 24); // Hello! Nicolas! You are 24 and undefined!
