// 배열.filter(구분자) : 배열의 각 요소들을 하나의 문자열로 합쳐주는 배열 메서드.

const elements = ["Fire", "Air", "Water"];

console.log(elements.join()); // "Fire,Air,Water"
console.log(elements.join("")); // "FireAirWater"
console.log(elements.join("-")); // "Fire-Air-Water"
