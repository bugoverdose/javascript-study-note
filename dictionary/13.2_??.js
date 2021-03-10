/*
  Nullish coalescing operator (??)
  - 기본적으로 좌측 그대로 반환. 
  - 좌측이 null 혹은 undefined일 때만 우측 반환.
  
  비교) a || b : a가 거짓인 경우 b 반환.
*/
const foo = null ?? "우측";
console.log(foo); // "우측"

const baz = 0 ?? 42;
console.log(baz); // 0

const emptyText = "" ?? "우측";
console.log(emptyText); // "" // falsy지만 그대로 반환.

const emptyText2 = "" || "우측";
console.log(emptyText2); // 우측 // falsy이므로 거짓. 우측 반환.
