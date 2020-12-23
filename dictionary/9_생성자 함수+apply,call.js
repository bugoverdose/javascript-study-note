/*
  생성자 내부에서 다른 생성자 호출
  - 생성자 함수 내부에 다른 생성자 함수와 공통된 내용이 있는 경우,
     call/apply를 통해 다른 생성자를 호출하여 중복 코드 제거 가능. 
*/
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
function Student(name, gender, school) {
  Person.call(this, name, gender); // Person 함수 코드 활용
  this.school = school;
}
function Employee(name, gender, company) {
  Person.apply(this, [name, gender]); // Person 함수 코드 활용
  this.company = company;
}

var John = new Student("John", "male", "SNU");
var Nick = new Employee("Nick", "male", "Google");
console.log(John); // Student {name: "John", gender: "male", school: "SNU"}
console.log(Nick); // Employee {name: "Nick", gender: "male", company: "Google"}
