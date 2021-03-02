/*
  동일한 key가 중복되는 경우 뒤에 존재하는 key:value가 덮어쓰게 됨
  : {...object1, ...object2} !== {...object2, ...object1}도 가능
*/
console.log({ ...podcast });
// { id: 258502, title: 'pod1', category: 'gore', rating: 3 }
console.log({ ...updateData });
// { rating: 1 }

console.log({ ...podcast, ...updateData });
// { id: 258502, title: 'pod1', category: 'gore', rating: 1 }
console.log({ ...updateData, ...podcast });
// { rating: 3, id: 258502, title: 'pod1', category: 'gore' }
