/*
  <클로저로 변수를 보호한 객체 생성 방법: 함수 생성 + 객체 return>
  - return되는 객체 publicMembers에는 run메서드와 moved 변수만 존재.
    - moved 변수는 getter 부여 때문에 읽기만 가능. 조작은 불가능.
    - playerId 변수는 return되지 않아 조작불가 + 읽는 것조차 불가능.
  - Object.freeze를 통해 객체의 run 메서드를 변경하는 것도 방지.
*/
var createCar = function () {
  var playerId = Math.ceil(Math.random() * 100000); // 비공개 멤버 지정.
  var moved = 0;

  var publicMembers = {
    get moved() {
      return moved; // getter 부여 (읽기 전용 속성)
    },
    run: function () {
      var dice = Math.ceil(Math.random() * 6);
      moved += dice;
      console.log(
        `${playerId}의 주사위 눈금은 ${dice}, 총 이동거리는 ${moved}`
      );
    },
  };
  Object.freeze(publicMembers);
  return publicMembers;
};
var car = createCar();

car.run(); // 5295의 주사위 눈금은 3, 총 이동거리는 3
car.run(); // 5295의 주사위 눈금은 5, 총 이동거리는 8
console.log(car.playerId); // undefined
console.log(car.moved); // 8

car.playerId = 33333; // 무시됨
car.moved = 100; // 무시됨
car.run(); // 5295의 주사위 눈금은 5, 총 이동거리는 13

// -----------------------------------------------
/* 
   Object.freeze를 사용하지 않는 경우, 
   car.run 메서드를 다른 내용으로 덮어쓰기 가능
*/
var createCar = function () {
  var playerId = Math.ceil(Math.random() * 100000); // 비공개 멤버 지정.
  var moved = 0;

  return {
    get moved() {
      return moved; // getter 부여 (읽기 전용 속성)
    },
    run: function () {
      var dice = Math.ceil(Math.random() * 6);
      moved += dice;
      console.log(
        `${playerId}의 주사위 눈금은 ${dice}, 총 이동거리는 ${moved}`
      );
    },
  };
};
var car = createCar();
car.run(); // 5295의 주사위 눈금은 3, 총 이동거리는 3

car.run = function () {
  console.log("asbasd");
};
car.run(); // asbasd
