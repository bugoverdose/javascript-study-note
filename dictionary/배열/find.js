// 배열.find(조건) : 해당 조건에 해당되는 요소들 중 최초로 발견되는 요소만 반환.
// 조건은 함수 형태 & 함수의 매개변수에는 배열의 각 요소가 인자로 자동 대입.

const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);
console.log(found); // 12
