/*
  undefined를 반환하는 경우들 
  1) 사용자가 명시적으로 undefined를 지정한 경우
  2) 자바스크립트 엔진은 사용자가 어떤 값을 지정했을 것이라고 예상되는 상황임에도 
     실제로는 지정하지 않았을 때 자동으로 undefined를 반환.
   (1) 변수: 선언은 했지만 값을 대입하지 않은 변수에 접근할 때.
       즉, 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근할 때.
   (2) 객체: 객체 내부에 존재하지 않는 property에 접근하려고 할 때.
   (3) 함수: return문이 없거나 호출되지 않는 함수의 실행 결과.
       즉, return하는 값이 없으면 undefined를 반환한 것으로 간주.
*/
var a;
console.log(a); // undefined (1) 값을 대입하지 않은 변수에 접근.

var obj = { a: 1 };
console.log(obj.b); // undefined (2) 존재하지 않는 property에 접근.

func = () => {};
var c = func(); // (3) return한 값이 없어서 undefined를 반환한 것으로 간주.
console.log(c); // undefined
/*
  cf) console.log(d); // 에러: Uncaught ReferenceError: abc is not defined
   - 아예 선언된 적 없는 식별자에 접근시 에러 발생
   - undefined가 출력되지는 않음.
*/

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
