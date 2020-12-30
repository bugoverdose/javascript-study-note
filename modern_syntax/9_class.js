/*
[ES6의 클래스 및 클래스 상속]

[클래스 생성]
class {
    constructor(){}
    static 스태틱메서드들(){}
    프로토타입메서드들(){}
};
- {중괄호} 내부에서는 function 키워드 생략해도 전부 메서드로 인식.
  - 각각의 메서드들은 쉼표(,)로 구분되지 않음.
- constructor라는 이름의 메서드는 생성자함수로 인식
- static 키워드가 앞에 붙으면 static 메서드를 생성
  - 이렇게 생성된 static 메서드는 생성자함수(클래스) 본인만이 접근 가능.
  - 클래스.staticMethod()
- 그 외 메서드는 prototype 객체 내부에 할당되는 메서드
  - 프로토타입 체이닝으로 통해 인스턴스에서도 접근 가능한 프로토타입 메서드들.
  - 인스턴스.prototypeMethod() 
  - 클래스.prototype.prototypeMethod() 

[인스턴스 생성]
var 인스턴스 = new 클래스;      // 생성자함수를 사용하는 것과 동일

[상속]
var 하위클래스 = class extends 상위클래스 // 상속 관계 설정
- 상속하는 하위클래스에서는 super 키워드를 통해 상위클래스에 접근 가능 

cf) super 키워드
  1) constructor 내부의 super는 SuperClass.constructor를 실행
  2) 그 외 메서드들의 경우 super 키워드를 SuperClass.prototype 객체처럼 사용 가능.
     하지만 호출한 메서드의 this는 super가 아니라 기존의 this값을 사용.
*/
// 비교: <클래스 구현[ES5]>
var ES5 = function (name) {
  // 생성자함수 ES5 생성
  this.name = name;
};
ES5.staticMethod = function () {
  // 생성자함수에 static 메서드 추가
  return this.name + " static method";
};
ES5.prototype.prototypeMethod = function () {
  // 생성자함수에 prototype 메서드 추가
  return this.name + " prototype method";
};

var es5Instance = new ES5("es5");
console.log(ES5.staticMethod()); // 'ES5 static method'
console.log(es5Instance.prototypeMethod()); // 'es5 prototype method'

// ------------------------------------------
// <클래스 문법[ES6]>
var ES6 = class {
  constructor(name) {
    // 생성자함수(constructor) 생성
    this.name = name;
  }
  static staticMethod() {
    // 생성자함수에 static 메서드 추가
    return this.name + " static method";
  }
  prototypeMethod() {
    // 생성자함수에 prototype 메서드 추가
    return this.name + " prototype method";
  }
};

var es6Instance = new ES6("es6");
console.log(ES6.staticMethod()); // 'ES6 static method'
console.log(es6Instance.prototypeMethod()); // 'es6 prototype method'

/* 
console.log(es6Instance);
ES6 {name: "es6"}
  name: "es6"
  __proto__:
    constructor: class
    prototypeMethod: ƒ prototypeMethod()
    __proto__: Object

cf) constructor라는 이름의 메서드를 추가하지 않은 경우
console.log(es6Instance);
ES6 {}
  __proto__:
    constructor: class
    constructor1: ƒ constructor1(name)
    prototypeMethod: ƒ prototypeMethod()
    __proto__: Object
*/
// ------------------------------------------
// <클래스 상속[ES6]>
var Rectangle = class {
  // Rectangle 클래스 생성
  constructor(width, height) {
    // 생성자함수(constructor) 생성
    this.width = width;
    this.height = height;
  }
  getArea() {
    // 생성자함수에 prototype 메서드 추가
    return this.width * this.height;
  }
};

var Square = class extends Rectangle {
  // Rectangle 클래스를 상속하는 Square 클래스 생성
  constructor(width) {
    super(width, width);
  }
  getArea() {
    console.log("size is :", super.getArea());
  }
};

// ------------------------------------------
// ------------------------------------------
/* Nodejs - 2.1.6 참고
전부 class안에서 정의됨
- 생성자함수는 constructor로 생성
- 스태틱 메서드(클래스 함수)는 static 키워드로 생성
- class 블록 내부의 다른 함수들은 전부 프로토타입 함수
extends를 통해 다른 클래스를 상속하는 클래스 생성
*/
class Human {
  constructor(type = "human") {
    this.type = type; // function(type){this.type = type || "human"}과 동일
  }
  static isHuman(human) {
    return human instanceof Human;
  }
  breathe() {
    alert("h-a-a-a-m");
  }
}

class child extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

const newChild = new child("human", "John", "Wick");
Human.isHuman(newChild); // true
// newChild.type == "human"
newChild.sayName(); // 팝업창으로 "h-a-a-a-m" / "John Wick" 표시됨

const newChild2 = new child("abc", "f.n.", "l.n.");
// newChild2.type == "abc"
newChild2.sayName(); // 팝업창으로 "h-a-a-a-m" / "f.n. l.n." 표시됨
