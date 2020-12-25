/*
  [기본 원리]
  1) 특정 html element에 적용된 class를 다른 것으로 대체.
  2) 대체된 class에 적용된 css 스타일이 해당 element에 적용. 

  classList vs className
  [1] className은 해당 element에 적용된 class명을 덮어쓰는 것만 가능.
        이미 element에 class가 적용된 경우 지워버림.
        element에 class가 적용되지 않았으면 새롭게 생성.
  [2] classList는 class와 관련하여 contains, add, remove, toggle 등 다양한 메서드 실행 가능.
        하나의 element에 복수의 class 존재하는 경우 세부 조작 가능.
        장점: 이미 존재하는 class 건들지 않을 수 있음.
*/

// [1] className : 해당 element에 적용된 class의 이름 변경.
const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

function handleClick() {
  const currentClass = title.className;
  if (currentClass == CLICKED_CLASS) {
    title.className = "";
  } else {
    title.className = CLICKED_CLASS;
  }
}

function init() {
  title.addEventListener("click", handleClick);
}
init();
/*
  id="title"인 element의 class명을 currentClass 변수에 대입.
  클릭했을 때 class="clicked"인 경우 id="title" class=""로 변경. 
  그 외의 경우 class="clicked"가 되도록 클래스명에 clicked 대입.

  문제점: btn 클래스 소멸. cursor: pointer; 없어짐.
*/
