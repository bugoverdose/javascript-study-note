/*
  펼치기 연산자 spreader operator [ES6] 
    : 하나의 배열/문자열의 요소들을 끄집어내어 인수들로 사용. 
    - 여러 배열/문자열을 하나처럼 사용하기 위해 활용 가능.

  array = [1, 2, 3, 4, 5]    
  ...array : 1, 2, 3, 4, 5
*/

const numArray = [10, 20, 3, 16, 45];
const max = Math.max(...numArray);
const min = Math.min(...numArray);
console.log(max, min); // 45 3

// 위와 동일. 수작업으로 입력하는 경우
const max1 = Math.max(10, 20, 3, 16, 45);
const min1 = Math.min(10, 20, 3, 16, 45);
console.log(max1, min1); // 45 3

// ==========================================

const part1 = ["head", "shoulders"];
const part2 = ["knees", "toes"];
console.log(...part1, ...part2); // head shoulders knees toes
