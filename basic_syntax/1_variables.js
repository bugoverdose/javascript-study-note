/*
  전역변수와 지역변수
   - 전역변수(global variable): 전역 스코프에 선언한 변수
     - 전역 컨텍스트의 LexicalEnvironment에 담긴 변수들.
   - 지역변수(local variable): 함수 내부에서 선언한 변수
     - 함수에 의해 생성된 실행 컨텍스트에서의 변수들.

   * 코드의 안전성을 위해서는 가급적 전역변수 사용을 최소화해야 함.
*/

// -----------------------------------------------------------------------------

/* 
 let / const / var
   원칙: const로 변수 선언 + 필요할 때 let으로 변수 선언
   금지사항: var 변수는 에러 발생 가능. 사용하지 않기
   camel case: 변수명은 소문자로 시작, 띄어쓰기하는 부분은 대문자 사용. ex) camelCase, daysOfWeek 
*/
// 변수: Create(생성) => Initialize(초기화) => Use(사용)
var a; //   a라는 변수 생성 (변수 선언)
a = 221; // 변수 a의 값을 221로 초기화 (변수에 값 할당)
var b = a - 5; // a를 사용
console.log(a, b);

a = 4; // a를 수정
console.log(a);

// ---------------------------------------

// const : 데이터를 수정할 수 없는 변수 생성. default로 const 사용하여 변수 선언
const c = 221; // 상수 변수 c 생성
// c = 4; // 에러 발생. const 수정 시도.
console.log(c);

// ---------------------------------------

//  let : 데이터를 수정할 수 있는 변수 생성. 필요할 때 let을 사용
let d = 200; // 변수 d 생성
d = 10; // d의 데이터 수정됨.
console.log(d);

// ---------------------------------------

const firstVar = "How to",
  secondVar = "create",
  thirdVar = "multiple variables";
console.log(`${firstVar} ${secondVar} ${thirdVar}`);
