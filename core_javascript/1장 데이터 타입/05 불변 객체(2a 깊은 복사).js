/*
  (1) 중첩된 객체에 대한 얕은 복사
    - 원본 객체에 직접 속한 property(user.name)에 대해서는 복사해서 새로운 데이터를 생성
    - property 내부의 property들(user.urls.blog 등)의 경우 원본 객체의 데이터를 그대로 참조.
    - user는 표면적으로만 불변. user.urls는 불변 객체가 아님.
*/
copyObject = (target) => {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};

var user = {
  name: "John",
  urls: {
    portfolio: "github.com/John",
    blog: "blog.com/John",
  },
};

var user2 = copyObject(user);

user2.name = "Nick";
console.log(user.name, user2.name); //John Nick
console.log(user === user2); // false (원본 불변)

user.urls.portfolio = "github.com/Nick"; // (원본 수정)
console.log(user.urls.portfolio, user2.urls.portfolio); //github.com/Nick github.com/Nick
console.log(user.urls.portfolio === user2.urls.portfolio); // true (사본도 변화)

user2.urls.blog = "blog.com/Nick"; // (사본 수정)
console.log(user.urls.blog, user2.urls.blog); //blog.com/Nick blog.com/Nick
console.log(user.urls.blog === user2.urls.blog); // true (원본도 변화)

/*
  사본의 name property를 변경한 경우 원본의 name property는 변하지 않음. (불변성)
  
  urls property의 내부 property를 변경하는 경우 (가변성)
    - 원본을 수정하면 사본도 함께 변화. 사본을 수정하면 원본도 함께 변화.
*/

// -----------------------------------
/*
  (2) 객체의 깊은 복사를 수행하는 범용 함수 예시: copyObjectDeep
      - target이 객체인 경우, 내부 property들 각각에 대해 copyObject 함수를 재귀적으로 호출.
      - target이 객체가 아닌 경우 그대로 빈 객체 result에 저장. 
      cf) target !== null 조건이 필요한 이유: typeof 명령어가 null에 대해서도 'object'를 반환하는 javascript 자체 버그 때문
*/
copyObjectDeep = (target) => {
  var result = {};
  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]);
    }
  } else {
    result = target;
  }
  return result;
};

var obj = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

var obj2 = copyObjectDeep(obj);
obj2.a = "사본 변화";
obj2.b.c = "사본 변화";
obj.b.d[1] = "원본 변화";

console.log(obj.a, obj2.a);
console.log(obj.b.c, obj2.b.c);
console.log(obj.b.d[1], obj2.b.d[1]);
// 원본이 변하든, 사본이 변하든 다른 쪽은 변하지 않음. (불변성)

console.log(obj);
// {a:1, b: {c: 2, d: [3, "원본 변화"], __proto__: Object}, __proto__: Object}
console.log(obj2);
// {a:"사본 변화", b: {c: "사본 변화", d: [3, 4], __proto__: Object}, __proto__: Object}

// -----------------------------------
/*
  (3) JSON을 활용한 간단한 깊은 복사: copyObjectViaJSON
     - 객체를 JSON 문법으로 표현된 문자열로 전환 후 다시 JSON 객체로 전환.
     - 한계: 메서드(함수), 숨겨진 property인 __proto__, getter, setter 등 
             JSON으로 변경할 수 없는 property들은 전부 무시됨. 복제되지 않음.
*/
copyObjectViaJSON = (target) => JSON.parse(JSON.stringify(target));

var obj3 = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
    func: function (x) {
      return x + 5;
    },
  },
};

var obj4 = copyObjectViaJSON(obj3);
obj4.a = "사본 변화2";
obj4.b.c = "사본 변화2";
obj3.b.d[1] = "원본 변화2";

console.log(obj3.a, obj4.a);
console.log(obj3.b.c, obj4.b.c);
console.log(obj3.b.d[1], obj4.b.d[1]);
console.log(obj3.b.func(5));
console.log(obj4.b.func(5)); // 에러. obj4.b에는 함수 func가 존재하지 않음.

console.log(obj3);
// {a:1, b: {c: 2, d: [3, "원본 변화2"], func: f(x), __proto__: Object}, __proto__: Object}
console.log(obj4);
// {a:"사본 변화2", b: {c: "사본 변화2", d: [3, 4], __proto__: Object}, __proto__: Object}
// __proto__는 무시되지 않은 것으로 보임 + 다만 메서드는 무시됨.
