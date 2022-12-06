## new 연산자와 생성자 함수

`new` 연산자로 함수를 호출하면 유사한 객체 여러 개를 쉽게 만들 수 있음.

생성자 함수: `new` 연산자로 호출하는 함수

- 함수 이름의 첫 글자를 대문자로 시작하는 것이 컨벤션

### `new` 연산자의 동작 원리

`new 생성자함수(...)`를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작함.

1. `this`에 빈 객체를 할당합니다.
2. 함수 본문을 실행합니다. this에 새로운 프로퍼티를 추가해 `this를 수정`합니다.
3. `this`를 반환합니다.

```javascript
function User(name) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)
  this.name = name;
  this.isAdmin = false;
  // return this;  (this가 암시적으로 반환됨)
}

let user = new User("보라");

console.log(user.name); // 보라
console.log(user.isAdmin); // false
```

---

- https://ko.javascript.info/constructor-new
