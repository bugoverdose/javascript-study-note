/*
<핵심>
1) 어떤 데이터타입든 생성자 함수를 통해 생성됨(null, undefined 제외).
2) 어떤 생성자 함수든 프로퍼티로 prototype 객체를 지니게 됨.
3) prototype은 무조건 객체이므로 프로토타입 체인의 최상단에는 Object.prototype이 위치하게 됨.
(예외) Object.create(null) 사용시, Object.prototype의 메서드에 접근불가능하지만 
                                   성능상 이점을 지닌 가벼운 객체 생성 가능.
                                   
Object.prototype 내부에 새로운 메서드를 추가하는 경우,
객체만이 아니라 모든 종류의 데이터타입들에서 해당 메서드 사용 가능해짐.
*/

/*
var instance = new Constructor();
instance.__proto__ == Constructor.prototype; // true

[핵심 도식]
  [Constructor] - [Constructor.prototype]
new |               /
  [instance] [instance.__proto__]

0) 생성자함수(Constructor)는 prototype이라는 property를 지님.
1) Constructor를 new 연산자와 함께 호출하면
2) Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스(instance)가 생성됨.
3) 이때 instance에는 __proto__라는 property가 자동으로 부여됨.
4) instance.__proto__는 Constructor.prototype을 참조하며, 생략가능함.

*prototype: 생성자함수에 의해 생성될 인스턴스가 사용할 메서드가 저장된 객체
*__proto__: 인스턴스에 숨겨진 객체. 인스턴스가 사용할 메서드가 실제로 저장됨.
 
--------------------------------
prototype
 : 함수를 정의하면 자바스크립트가 해당 함수에 자동으로 생성시키는 property
 : 해당 함수를 new 연산자와 함께 생성자 함수로 사용할 경우,
   생성되는 인스턴스는 prototype을 참조하여 __proto__를 자동으로 지니게 됨.
 : 생성자함수의 prototype에 어떤 메서드/property가 존재한다면,
   인스턴스에서도 __proto__를 통해 해당 메서드/property에 자유롭게 접근 가능해짐.

-----------------
__proto__ 
 : 접근하고자 하는 경우 instance.__proto__가 아니라, 
   ObjectPrototypeOf() 혹은 Object.create()를 활용하는 것이 권장됨.
 : 생략가능한 property. 생략하도록 정의되어 자바스크립트의 구조가 만들어짐.
 : 'dunder proto (dunder = double underscore)'
*/

// ----------------------------------------------------------------
var Person = function (name) {
  this._name = name;
};

// 생성자함수 Person의 prototype에 getName 메서드 지정
Person.prototype.getName = function () {
  return this._name;
};

// Person의 john 인스턴스 생성
var john = new Person("John");

Person.prototype === john.__proto__;
// true
// prototype과 __proto__는 서로 같은 객체.

// ------------------------------
/*
<__proto__는 생략가능한 property>
1) __proto__를 생략해도 제대로 __proto__의 메서드 사용 가능.
2) 오히려 생략해야 메서드의 this값이 제대로 인스턴스를 가리키게 됨.
*/
var john = new Person("John");
john.getName();
// John

/*
<__proto__는 생략하지 않는 경우 문제 발생>
- 메서드로서 호출되기 때문에 this값은 인스턴스 자체를 가리키지 않게 됨.
*/
var john = new Person("John");
john.__proto__.getName();
// undefined
// 원인: getName의 this값은 john이 아니라 john.__proto__가 되기 때문임.

// ----------------------------------------------------------------
/*
<Constructor와 instance의 디렉토리 구조>
- 콘솔창에서 짙은 색은 열거가능, 즉 접근 가능. (method1000, property1000)
- 옅은 색은 enumerable: false, 즉 열거불가, 접근 불가. (constructor, __proto__)
*/
var Constructor = function (name) {
  this.name = name;
};
Constructor.prototype.method1000 = function () {};
Constructor.prototype.property1000 = "Constructor Prototype Property";
console.dir(Constructor);
/*
ƒ Constructor(name)
  arguments: null
  caller: null
  length: 1
  name: "Constructor"
  prototype:
    method1000: ƒ ()
    property1000: "Constructor Prototype Property"
    constructor: ƒ (name)
    __proto__: Object
  __proto__: ƒ () 
  [[FunctionLocation]]: VM93:1 // 실제 코드상 접근 불가.
  [[Scopes]]: Scopes[2] // 실제 코드상 접근 불가.
*/

var instance = new Constructor("New Instance");
console.dir(instance);
/*
Constructor
  name: "New Instance"
  __proto__:
    method1000: ƒ ()
    property1000: "Constructor Prototype Property"
    constructor: ƒ (name)
    __proto__: Object
*/

Constructor.prototype == instance.__proto__; // true
