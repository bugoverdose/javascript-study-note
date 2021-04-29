/*
  interface
  : 특정한 객체 형식을 데이터타입의 일종으로 사용하는 방법.
  : JS 코드로 컴파일되지 않음. class의 타입스크립트 버전

  interface: a way of declaring and using a certain object pattern as a data type
*/
interface Human {
  firstName: string;
  age: number;
  gender: string;
}

const sayHello = (person: Human): string => {
  return `Hello! ${person.firstName}! You are ${person.age} and ${person.gender}!`;
};

console.log(
  sayHello({
    firstName: "Nico",
    age: 22,
    gender: "male",
  })
); // Hello! Nico! You are 22 and male!

export {};
