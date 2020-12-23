/*
  펼치기 연산자 spreader operator [ES6] 
    - apply 사용하지 않고도 여러 개의 인수를 받는 메서드에 
      하나의 배열로 인수들 전달하기 위해 활용 가능. 

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
