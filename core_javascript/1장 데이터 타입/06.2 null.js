/*
null은 비어있음을 명시적으로 나타내고 싶을 때 사용하도록 만들어진 데이터타입.
  
주의사항: typeof null은 object.
어떤 변수의 값이 null인지의 여부를 판별하려면 동일성 비교(===) 필요!
  
- undefined == null은 true. 서로 동등.
- undefined === null은 false. 서로 불일치.
*/

var n = null;
console.log(typeof n); // object

console.log(n == undefined); // true
console.log(n === undefined); // false

console.log(n == null); // true
console.log(n === null); // true

console.log(undefined == null); // true
console.log(undefined === null); // false
/*
  == : 동등 연산자. equality operator
  === : 일치 연산자. identity operator
*/
