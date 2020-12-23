/*
  new 명령어와 함께 함수를 호출하면 해당 함수는 생성자로서 동작하게 됨.

  생성자 함수: 공통된 성질을 지닌 객체를 생성하는 함수.
  - class: 생성자. 구체적인 인스턴스를 만들기 위한 일종의 틀.
  - instance: 클래스를 통해 만든 객체. 인스턴스.
*/
var Cat = function (name, age) {
  this.bark = "meow";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 7);
// 생성자 함수 Cat을 호출하여 변수 choco에 할당.
// 호출되는 생성자 함수 Cat 내부의 this는 인스턴스 객체 choco를 가리킴

console.log(choco); // Cat {bark: "meow", name: "초코", age: 7}

var nabi = new Cat("나비", 5); // 생성자 함수 Cat 내부에서의 this는 nabi 인스턴스를 가리킴.
console.log(nabi); // Cat {bark: "meow", name: "나비", age: 5}
