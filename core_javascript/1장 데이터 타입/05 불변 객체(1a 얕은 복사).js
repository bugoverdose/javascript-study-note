/*
  객체의 가변성에 따른 문제점: changeName 함수 사용시.
    - 얕은 복사의 경우, 전달받은 객체의 내부 property를 수정하면 원본 객체까지 함께 변경됨.
*/
var user = {
  name: "John",
  gender: "male",
};

changeName = (user, newName) => {
  var newUser = user;
  newUser.name = newName;
  return newUser;
};

var user2 = changeName(user, "Nick");

console.log(user.name, user2.name); // Nick Nick
console.log(user === user2); // true

// -----------------------------------
/*
  Bad 해결방법(1) changeName 함수가 새로운 객체를 반환하도록 설정
    - 문제점: gender 등 기존 객체의 property들을 전부 다 하드코딩으로 입력해야 함. 
*/
var user = {
  name: "John",
  gender: "male",
};

changeName = (user, newName) => {
  return {
    name: newName,
    gender: user.gender,
  };
};

var user2 = changeName(user, "Nick");

console.log(user.name, user2.name); //John Nick
console.log(user === user2); // false

// -----------------------------------
/*
  Bad 해결방법(2) 얕은 복사: 기존 정보를 복사해서 새로운 객체를 반환하는 copyObject 함수
*/
copyObject = (target) => {
  var result = {};
  for (var prop in target) {
    result[prop] = target[prop];
  }
  return result;
};
// for in 문법을 사용해 result 객체에 매개변수 target 객체의 property를 복사

var user = {
  name: "John",
  gender: "male",
};

var user2 = copyObject(user);
user2.name = "Nick";

console.log(user.name, user2.name); //John Nick
console.log(user === user2); // false

/*
해결방법(1)과 동일한 결과. 하드코딩 감소. 
  - 문제점1: 프로토타입 체이닝상의 모든 property를 복사, getter/setter는 복수하지 않음, 얕은 복사만을 수행
  - 문제점2: copyObject 함수를 사용한다는 전제하에서만 user는 (부분적으로) 불변 객체.  
             시스템적으로 user객체는 여전히 가변적임.
  - 문제점3: 중첩된 객체가 주어진 경우, copyObject 함수는 
             참조형 데이터가 저장된 property가 있을 때 그 주솟값만을 복사함.
             복제된 객체 내부의 참조형 데이터가 들어있는 property를 수정하는 경우 원본도 수정됨. (여전히 가변적)
*/
