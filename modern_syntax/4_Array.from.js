/*
  Array.from 메서드 [ES6]
  : 순회 가능한 모든 종류의 데이터타입을 배열로 전환.
  : 더 이상 유사배열객체에 배열 메서드를 적용하기 위해서
    apply/call 메서드를 사용하지 말라는 취지에서 도입됨.
*/
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};
var arr = Array.from(obj);
console.log(arr); // ["a", "b", "c"]

/*
  유사배열객체(array-like object)
   - key값이 0, 1, 2 등 0이상의 정수인 property가 존재하고,
     length라는 이름의 property의 값이 0, 1, 2 등 0 이상의 정수인 객체.
   - 위의 obj 객체가 유사배열객체.
   - 함수 내부에서 접근할 수 있는 arguments 객체, 
     querySelector 등 Node 선택자로 선택한 결과인 NodeList도 유사배열객체에 해당.
*/
