/*
  구조분해한 요소의 이름 변경 방법.
*/
const Obj = {
  id: 1,
  name: "Name",
};

const { id: ObjId, name: ObjName } = Obj;
console.log(ObjId); // 1
console.log(ObjName); // Name
