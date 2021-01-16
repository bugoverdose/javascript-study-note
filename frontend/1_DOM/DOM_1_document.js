/*
JS DOM Functions
DOM: Document Object Module
  • document : HTML을 DOM 객체로 변경시켜주는 기능
  • html 코드의 elements(태그들)에 JS 객체로 접근할 수 있도록 하는 기능.
*/

console.log(document);
/* 현재 위치의 html 파일의 모든 코드를 있는 그대로 출력. 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>~~~</title>
  </head>
  <body>
    <h1>~~~<h1>
       ~~~~
    <script>~~~</script>
  </body>
</html> 

요약: document는 HTML document를 JavaScript로 접근할 수 있게 해줌.
*/

// ------------------------------------------

// 추가적으로 querySelector 없이도 특정 태그 선택하여 그 내부 내용은 바꿀 수 있음.

console.log(document.title);
// 출력: JS browser basics

document.title = "Changed by DOM_1.js";
// html 코드들 중 <title> 태그를 선택하고 그 내부 내용을 수정.
// 실제 브라우저에서 탭의 이름 변경됨.

console.log(document.title);
// 출력: Changed by DOM_1.js
