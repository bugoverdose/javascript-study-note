/*
  slug : 자동으로 데이터를 다른 내용으로 수정하여 대입해주는 것?

  slug 예시들
  - /12335/lectures => /nuber-eats/lectures // 강의id를 'nuber-eats'로 변경
  - 'KoreanBBQ', '  korean-bbQ ' 등 뭐라고 입력하든 'korean-bbq'로 통일 등.
*/
const categoryName = "  Korean BBq ";

const newCategoryName = categoryName.trim(); // 앞뒤에 공백 제거.
console.log(newCategoryName); // "Korean BBq"

const newCategoryName2 = newCategoryName.toLowerCase(); // 전부 소문자 전환.
console.log(newCategoryName2); // "korean bbq"

// ============================================
const manySpaces = "korean bbq is the best";
const onlyTheFirstSpace = manySpaces.replace(" ", "-");
console.log(onlyTheFirstSpace); // "korean-bbq is the best"
// => Reg Exp 활용 필요.

// ============================================
