/* let / const / var
 원칙: const로 변수 선언 + 필요할 때 let으로 변수 선언
 금지사항: var 변수는 에러 발생 가능. 사용하지 않기
 camel case: 변수명은 소문자로 시작, 띄어쓰기하는 부분은 대문자 사용. ex) camelCase, daysOfWeek */

/* 변수: Create(생성) => Initialize(초기화) => Use(사용) */
var a = 221; // a라는 변수 생성 & 221로 초기화
var b = a - 5; // a를 사용
console.log(a, b);

a = 4; // a를 수정
console.log(a);

/* const : 데이터를 수정할 수 없는 변수 생성. default로 const 사용하여 변수 선언 */
const c = 221; // 상수 변수 c 생성
c = 4; // 에러 발생. const 수정 시도.
console.log(c);

/* let : 데이터를 수정할 수 있는 변수 생성. 필요할 때 let을 사용 */
let d = 200; // 변수 d 생성
d = 10; // d의 데이터 수정됨.
console.log(d);
