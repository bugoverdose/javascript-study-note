/* 
  [document.querySelector]
  - 특정 태그를 선택하고 객체로 변환. 
  - innerHTML, style 등을 활용해 더 세부적인 요소 수정 가능해짐.

  getElement 시리즈에 비해 활용도가 더 높음. 
  - querySelector can find by classes, pseudo-selectors, combinations, etc.
  - ex) document.querySelector("div > span:first-child") 
    - div 태그의 직접적인 자식인 span태그 중 첫번째를 선택
    (비교) getElementById는 id로만 찾음. getElementByClass는 class로만 찾는 등. 사용방법이 더 구체적임

  cf) querySelector, getElementByClassName 등은 전부 'Node 선택자'에 해당
      NodeList : Node 선택자로 선택한 결과들. html element들.
*/

const consoleElement = document.querySelector("#console");
console.log(consoleElement);
// id="console"인 element를 선택하고 consoleElement 객체로 선언.
// 출력: <h1 id="console">Check the Console</h1>

const contentElement = document.querySelector(".content");
console.log(contentElement);
// class="content"인 element를 선택하고 contentElement 객체로 선언.
// 출력: <h2 class="content">I'm from index.html</h2>

// ------------------------------------------

/*
[console.dir] 
- 특정 객체의 모든 key: value들 확인하는 기능.
- 선택해서 수정 가능한 요소들 확인하는 용도.
*/
console.dir(contentElement);
// contentElement 객체, 즉 'h2.content객체'에서 선택할 수 있는 속성값들을 콘솔에 출력.
// 해당 객체의 innerHTML은 해당 태그 내부의 내용을 의미하는 속성

// ------------------------------------------

/* 
[객체.innerHTML] 
- 해당 객체(html 태그) 내부의 내용 변경 용도.
[객체.style] 
- 해당 객체(html 태그)의 css 속성 변경 용도.

- 전부 console.dir로 확인 가능.
*/
contentElement.innerHTML = "I have been changed by DOM_2.js";
// contentElement 객체, 즉 h2태그 내부의 내용을 변경하여 화면에 출력.
// 전: <h2 class="content">I'm from index.html</h2>
// 후: <h2>I have been changed by DOM_2.js</h2>

contentElement.style.color = "red";
// contentElement 객체, 즉 h2태그의 글자색을 빨간색으로 변경하여 화면에 출력.
