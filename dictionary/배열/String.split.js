/*
  String.split()
  - 문자열을 배열로 변환.
  - 인자는 구분자 역할.
*/
console.log(window.location.href);
// https://github.com/bugoverdose?tab=repositories

console.log(window.location.href.split("tab="));
// ["https://github.com/bugoverdose?", "repositories"]

// ============================================================
const genres = "Comedy,Horror,Action";

const genreArray = genres.split(",");
genreArray; // ["Comedy", "Horror", "Action"]

// ============================================================
const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
words; // ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]

const chars = str.split("");
chars; // ["T", "h", "e", " ", "q", "u", "i", "c", "k", " ", "b", "r", "o", "w", "n", " ", "f", "o", "x", " ", "j", "u", "m", "p", "s", " ", "o", "v", "e", "r", " ", "t", "h", "e", " ", "l", "a", "z", "y", " ", "d", "o", "g", "."]

const strCopy = str.split();
strCopy; // ["The quick brown fox jumps over the lazy dog."]

// ============================================================
