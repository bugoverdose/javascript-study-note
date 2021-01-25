/*
  class : property들의 특성 & 접근 권한 설명 필요
  - JS 코드쪽에 class 문법이 필요한 경우, interface 대신 사용.
    ex) React, Express, Node 등 대부분의 경우 필요.

  접근권한
  - public 변수 : 어디에서든 해당 값에 접근 가능.
  - private 변수 : 해당 클래스 내부에서만 해당 값에 접근 가능. 보호. 호출불가 설정.

[Vanilla JS]
1) constructor : 생성자 함수. 
               : 해당 클래스로부터 인스턴스 객체를 생성할 때 자동실행되는 메서드
2) static 메서드 : 해당 클래스 내부에서 사용 가능한 메서드. 앞에 static 키워드 추가.
                 : 인스턴스가 생성 없이, 클래스에서 직접 호출 가능한 메서드. 
3) 그 외 메서드 : 클래스로 생성된 인스턴스에서만 호출 가능한 메서드.
*/
class Human {
  public firstName: string;
  public age: number;
  public gender: string;
  constructor(firstName: string, age: number, gender: string) {
    this.firstName = firstName;
    this.age = age;
    this.gender = gender;
  }
}

const nicolas = new Human("Nico", 22, "male");

const sayHello = (person: Human): string => {
  return `Hello! ${person.firstName}! You are ${person.age} and ${person.gender}!`;
};

console.log(sayHello(nicolas)); // Hello! Nico! You are 22 and male!
