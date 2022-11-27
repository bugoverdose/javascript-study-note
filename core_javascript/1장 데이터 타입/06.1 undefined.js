/*
  어떤 값이 지정되었을 것이라고 가정한 상황에서 실제로는 해당 위치에 값이 지정하지 않았을 때 
  자바스크립트 엔진은 자동으로 undefined를 반환.

   (1) 변수: 선언은 했지만 값을 대입하지 않은 변수에 접근할 때.
       즉, 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근할 때.
   (2) 객체: 객체 내부에 존재하지 않는 property에 접근하려고 할 때.
   (3) 함수: return문이 없거나 호출되지 않는 함수의 실행 결과.
       즉, return하는 값이 없으면 undefined를 반환한 것으로 간주.
*/
var a;
console.log(a); // undefined (1) 아직 값이 할당되지 않은 변수에 접근.

var obj = { a: 1 };
console.log(obj.b); // undefined (2) 존재하지 않는 property에 접근.

func = () => {};
var c = func(); // (3) return한 값이 없어서 undefined를 반환한 것으로 간주.
console.log(c); // undefined

// cf) 아예 선언되지 않은 식별자(변수명)에 접근시 에러 발생. undefined가 출력되지는 않음.
// console.log(d); // 에러: Uncaught ReferenceError: abc is not defined

// ---------------------------------------
/*
  undefined와 배열
   - 배열의 빈 공간에는 undefined조차 할당되어있지 않음.
   - '비어있는 요소'는 말 그대로 비어있음. 'empty'로 표현됨.
   - '비어있는 요소'는 다양한 배열 메서드의 순회 대상에서 제외됨.
*/
var arr1 = [];
console.log(arr1); // []

arr1.length = 3;
console.log(arr1); // [empty x 3]

var arr2 = new Array(3); // new 연산자, Array 생성자 함수. 크기가 3인 배열 인스턴스 생성.
console.log(arr2); // [empty x 3]

var arr3 = [undefined, undefined, undefined];
console.log(arr3); // [undefined, undefined, undefined]

// ---------------------------------------
/*
  빈 요소와 배열의 순회
  - undefined가 할당된 요소는 메서드가 그대로 결과 출력됨.
  
  - 비어있는 요소(empty)는 다양한 배열 메서드의 `순회 대상에서 제외`됨.
     => forEach, map, filter, reduce 등의 메서드는 
        비어있는 요소에 대해 어떠한 처리도 하지 않고 그대로 건너뛰게 됨.   
*/
var arr10 = [undefined, 10];
var arr20 = [];
arr20[1] = 20;
console.log(arr10, arr20); // [undefined, 10] [empty, 20]

func1 = (a, b) => {
  console.log(a, b); // value, index
};
arr10.forEach(func1);
// undefined 0
// 10 1
arr20.forEach(func1);
// 20 1

arr10.map((a, b) => a + b); // [NaN, 11]
arr20.map((a, b) => a + b); // [empty, 21]

arr10.filter((a) => !a); // [undefined]
arr20.filter((a) => !a); // []

console.log(arr10.reduce((a, b, c) => a + b + c, "")); // "undefined0101"
console.log(arr20.reduce((a, b, c) => a + b + c, "")); // "201"

/*
  원인: 배열도 객체. 존재하지 않는 property에 대해서는 순회하지 않음.
  
  값이 지정되지 않은 index는 아직 존재하지 않는 property로 간주.
   - 배열의 length property에 값을 지정하면(arr1.length = 3 등) 
      즉시 그 개수만큼 빈공간을 확보하지 않음.
   - 특정 index에 값을 지정했을 때 비로소 메모리에서 빈 공간을 확보하고 
      index를 이름으로 지정 + 데이터의 주소값을 저장.
*/

/*
  1) 사용자가 명시적으로 undefined를 지정한 경우,
    해당 undefined는 그 자체로 하나의 값으로 동작하게 됨.
    property나 배열의 요소로 할당된 undefined는 고유의 key값(property명)이 실존.
    배열의 순회의 대상도 될 수 있음.

  2) 자바스크립트가 반환하는 undefined는 실제로 값이 없다는 의미.
    해당 property의 key값, 배열의 index 자체가 존재하지 않는다는 의미.
*/
