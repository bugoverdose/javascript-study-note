// 배열.find(조건) : 해당 조건에 해당되는 요소들 중 최초로 발견되는 요소만 반환.

const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);
console.log(found); // 12
