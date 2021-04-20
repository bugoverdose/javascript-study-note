/*
  addEventListener("이벤트", 콜백함수)
  - 발생한 "이벤트"에 대한 정보가 콜백함수의 인자로 들어오게 됨.
  - 콜백함수를 호출할 때 메서드 자신의 this를 상속하도록 정의되어있음.
  - htmlElement.addEventListener 메서드의 this는 htmlElement이므로
    addEventListener 메서드의 콜백함수의 this도 htmlElement
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
// ================================================
const getVideo = () => "a callback function";

recordBtn.addEventListener("click", getVideo);
// recordBtn.removeEventListener("click", getVideo);로 제거

recordBtn.onclick = getVideo;
// recordBtn.onclick = null;로 제거

// ================================================
element.addEventListener(
  "click",
  (e) => {
    /* ~~ */
  },
  { once: true } // 한번만 실행되도록?
);

// ================================================
