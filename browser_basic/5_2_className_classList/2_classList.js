/*
  [2] classList 사용방법
    classList.contains("abc") : 해당 element의 class들 중 "abc"가 존재하면 true / 존재하지 않으면 false.
    classList.add("abc") : 해당 element에 class="abc" 추가
    classList.remove("abc") : 해당 element에 class="abc" 제거
*/

const title2 = document.querySelector("#title2");
const CLICKED_CLASS2 = "clicked";

function handleClick2() {
  const hasClass = title2.classList.contains(CLICKED_CLASS2);
  if (!hasClass) {
    title2.classList.add(CLICKED_CLASS2);
  } else {
    title2.classList.remove(CLICKED_CLASS2);
  }
}

function init2() {
  title2.addEventListener("click", handleClick2);
}
init2();
/*
  contains : 해당 element의 "clicked" 클래스 포함 여부(T/F)를 hasClass 변수에 저장
  not hasClass가 참인 경우, 즉 class="clicked"가 없는 경우 clicked클래스 추가.
  clicked클래스가 있다면 clicked클래스 제거.
  
  
*/
