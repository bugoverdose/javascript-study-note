// 배열.flat(depth) : 배열 내부에 배열이 중첩된 경우 내부 요소들을 끄집어내주는 메서드.

const array = [[[1, 2, 3], 4], [5, 6, 7], [], [], []];

console.log(array.flat()); // [[1, 2, 3], 4, 5, 6, 7]  // 디폴트는 1
console.log(array.flat(1)); // [[1, 2, 3], 4, 5, 6, 7]
console.log(array.flat(2)); // [1, 2, 3, 4, 5, 6, 7]
