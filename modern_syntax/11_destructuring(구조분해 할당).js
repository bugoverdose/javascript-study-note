/* 
  구조분해 할당: 객체, 배열로부터 속성, 요소를 간편하게 꺼내는 방법
    const {속성명, 속성명{속성명}} = 원본 객체
    const [변수명, , 변수명] = 원본 배열
  
  node.js의 모듈 시스템에서 특히 자주 사용됨.
  cf) 객체의 경우 함수의 this 값이 달라지기 때문에 필요한 경우 bind 함수 활용.

https://velog.io/@public_danuel/destructuring-assignment
*/

// (1) 기존 문법
const searchingBy = req.query.term;

// (2) 구조분해할당 [ES6]
const {
  query: { term: searchingBy },
} = req;

//---------------------------------
// 객체의 property와 메서드 꺼내기를 같은 이름의 변수에 대입하기
const candyMachine = {
  status: {
    name: "node",
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};

// (1) 기존 문법
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;

// (2) 구조분해할당 [ES6]
const {
  getCandy,
  status: { count }, // status 내부의 count처럼 여러 단계 안의 property도 찾을 수 있음.
} = candyMachine;

// -----------------------------------------
// 배열의 요소 꺼내서 특정 변수명에 할당하기
const array = ["nodejs", {}, 10, true];

// (1) 기존 문법
var node = array[0];
var obj = array[1];
var bool = array[3];

// (2) 구조분해할당 [ES6]
const [node, obj, , bool] = array;
// index에 따라 대입. index=2의 값은 무시한다는 의미.
