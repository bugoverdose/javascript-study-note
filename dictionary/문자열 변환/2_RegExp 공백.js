/*
  RegExp 활용해야 중복 선택하여 전부 다 replace 가능.
*/
const manySpaces = "korean bbq is the best";

const onlyTheFirstSpace = manySpaces.replace(" ", "-");
console.log(onlyTheFirstSpace); // "korean-bbq is the best"

const allTheSpaces = manySpaces.replace(/ /g, "-");
console.log(allTheSpaces);
// "korean-bbq-is-the-best"

// ===========================================================
const multipleSpaces = "korean   bbq  is the   best";
multipleSpaces.replace(/ /g, "-"); // "korean---bbq--is-the---best"

const oneSpaceEach = multipleSpaces.replace(/ +/g, " ");
console.log(oneSpaceEach); // "korean bbq is the best"
oneSpaceEach.replace(/ /g, "-"); // "korean-bbq-is-the-best"

// ===========================================================
