/*
  classList.toggle("클래스명")
   - class="클래스명"의 존재 여부를 확인하고, 있으면 제거, 없으면 추가
   - contains, add, remove의 기능 통합.

  장점: 관심 대상 밖의 클래스들은 전혀 건들지 않음.
   - class="btn" <=> class="btn clicked"
*/
const title3 = document.querySelector("#title3");
const CLICKED_CLASS3 = "clicked";

function handleClick3() {
  title3.classList.toggle(CLICKED_CLASS3);
}

function init3() {
  title3.addEventListener("click", handleClick3);
}
init3();
