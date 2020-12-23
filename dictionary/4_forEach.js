/*
  forEach 메서드: 콜백 함수에게 제어권을 넘겨받는 함수
   - array.forEach 메서드의 콜백함수의 this는 전역함수
   
  array.forEach(함수A);
   array 배열의 각 요소를 index=0부터 차례로 하나씩 꺼내어 그 값을 
   콜백함수 A의 첫번째 인자로 삼아 콜백함수 A를 실행시키는 함수.
*/

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x);
});
// Window { ... } 1
// Window { ... } 2
// Window { ... } 3
// Window { ... } 4
// Window { ... } 5
