/*
  Types
  - 각 매개변수에 어떤 타입의 데이터가 담길지 사전에 지정 가능. 
    : 인자의 디폴트 타입은 any
  - 각 함수가 어떤 타입의 데이터를 반환할 것인지 사전에 지정 가능.
    : 반환값의 디폴트 타입은 void 
*/
const sayHi1 = (name: string): void => {
  console.log(`Hello ${name}!`);
};
sayHi1("Nico"); // Hello Nico!

const sayHi2 = (name: string): string => {
  return `Hello ${name}!`;
};
console.log(sayHi2("Nico")); // Hello Nico!
