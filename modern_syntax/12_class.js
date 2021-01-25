/*
1) constructor : 생성자 함수. 
               : 해당 클래스로부터 인스턴스 객체를 생성할 때 자동실행되는 메서드
2) static 메서드 : 클래스에서 사용 가능. 앞에 static 키워드 추가.
                 : 인스턴스가 생성 없이, 클래스에서 직접 호출 가능한 메서드. 
3) 그 외 메서드 : 클래스로 생성된 인스턴스에서만 호출 가능한 메서드.

CLASS.staticMethod();
Instance.prototypeMethod();
*/
class CLASS {
  static staticMethod() {
    return this.name + " static method";
  }
  prototypeMethod() {
    return this.name + " prototype method";
  }
  constructor(name) {
    this.name = name;
  }
}
CLASS.staticMethod(); // 'CLASS static method'

const Instance = new CLASS("instance");
Instance.prototypeMethod(); // 'instance prototype method'

// Error 발생
CLASS.prototypeMethod();
Instance.staticMethod();
