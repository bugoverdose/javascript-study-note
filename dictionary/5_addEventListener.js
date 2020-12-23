/*
  addEventListener 메서드 
  - 콜백함수를 호출할 때 메서드 자신의 this를 상속하도록 정의되어있음.
  - htmlElement.addEventListener 메서드의 콜백함수의 this는 htmlElement
*/

document.body.innerHTML += '<button id="a">Click Me</button>';
document.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e);
});
// 출력: <button id="a">Click Me</button>   MouseEvent { ... }

/* 
   브라우저에 웹페이지에 버튼 생성. 
   클릭하면 지정된 element (document.body.querySelector('#a'))와
         클릭 이벤트에 관한 정보가 담긴 객체 (MouseEvent { ... }) 출력됨.
   document.body.querySelector('#a').addEventListener(~,~) 내부의 
   콜백함수의 this 값은 document.body.querySelector('#a')이 됨. 즉, <button id="a">Click Me</button>
*/
