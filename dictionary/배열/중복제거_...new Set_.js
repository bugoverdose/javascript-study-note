const mixedArr = ["John", 2, "1", 34, 1, 2, "John"];

const uniqueValues = [...new Set(mixedArr)];

console.log(uniqueValues); // ["John", 2, "1", 34, 1]
