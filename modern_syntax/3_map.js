/*
  map 메서드: array의 각 요소에 대해 콜백함수를 실행하고, 
              그 실행결과들로 새로운 array을 return하는 메서드

  배열.map((매개변수) => ~~~ })
  - 배열의 각 item을 매개변수로 받아 함수를 실행하고,
    각 실행결과에 따라 return된 값들로 새로운 array 반환
*/
const foods = ["curry", "ramen", "meat"];
const foodsMap = foods.map((current) => {
  return `${current} is delicious`;
});
console.log(foods); // ["curry", "ramen", "meat"]
console.log(foodsMap); // ["curry is delicious", "ramen is delicious", "meat is delicious"]

// -----------------------------------------
// React : dynamic component generation
let foods = [
  { id: 1, name: "kimchi", spiciness: 4 },
  { id: 2, name: "ramen", spiciness: 5 },
  { id: 3, name: "curry", spiciness: 1 },
]; // 데이터 객체들의 배열. 각 객체는 매개변수 dish에 담기게 됨.

// map메서드로 동적으로 생성된 Food 컴포넌트들의 배열이 return됨. {컴포넌트 배열}
const App = () => {
  return (
    <div>
      <h1>I am App Component</h1>
      {foods.map((dish) => (
        <Food key={dish.id} fav={dish.name} spiciness={dish.spiciness} />
      ))}
    </div>
  );
};
// -----------------------
/*
  [세부구조]
   Array.prototype.map(callbackFunc, thisArg)
   - map 메서드의 매개변수는 2가지
      1) callbackFunc: Array의 각 요소에 대해 반복 실행할 콜백함수.
      2) thisArg (선택사항)
       - 콜백함수 내부에서 this로 인식할 대상 지정.
       - 생략하면 콜백함수는 일반적인 함수처럼 this값으로 전역객체 바인딩.
   - Array 배열의 모든 요소들에 대해 순차적으로 콜백함수를 반복 호출.
     콜백함수의 실행결과들로 새로운 배열을 생성하여 return.

   callbackFunc: function(currentValue, index, array) { ~~ }
   - currentValue: 배열의 요소들 중 현재 선택된 값. 
   - index: 현재 값의 index값
   - array: map 메서드의 대상이 되는 배열 자체, 즉 Array (생략가능)
*/
var arr = [10, 20, 30];
var callback = function (currentValue, index) {
  console.log(`currentValue: ${currentValue}, index: ${index}`);
  return currentValue + 5;
};

var newArr = arr.map(callback);
console.log(newArr);
// currentValue: 10, index: 0
// currentValue: 20, index: 1
// currentValue: 30, index: 2
// [15, 25, 35]

// ---------------------------------

// 주의: map메서드에서는 콜백함수의 매개변수들은 순서에 따라 의미가 정해짐.
// 콜백함수의 인자 순서를 틀린 경우 의도와는 다른 배열이 생성됨.
var arr = [10, 20, 30];
var callback = function (index, currentValue) {
  console.log(`currentValue: ${currentValue}, index: ${index}`);
  return currentValue + 5;
};

var newArr = arr.map(callback);
console.log(newArr);
// currentValue: 0, index: 10
// currentValue: 1, index: 20
// currentValue: 2, index: 30
// [5, 6, 7]
