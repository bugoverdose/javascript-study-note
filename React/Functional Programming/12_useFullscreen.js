/*
  모든 element에 적용 가능한 풀스크린 <-> 일반크기 토글 기능 + 콜백함수 실행
  1) element : 풀스크린 토글할 대상의 ref 속성에 대입.
  2) triggerFull : 풀스크린되도록. (+ 콜백함수 true로 실행)
  3) exitFull : 풀스크린 해제. (+ 콜백함수 false로 실행)
              : 풀스크린일 때만 클릭 가능하도록 해줘야 함.

  cf) 콜백함수를 인자를 대입하는 경우, 풀스크린이 될 때 & 다시 되돌아올 때 실행됨. 
      다만 esc 키로 나갈 때는 예외적으로 실행되지 않음. 
*/
import { useRef } from "react";
import ReactDOM from "react-dom";

const useFullscreen = (callback) => {
  const runCb = (isFull) => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
      runCb(true); // 콜백함수에 인자로 true 전달하면서 실행.
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    runCb(false); // 콜백함수에 인자로 false 전달하면서 실행.
  };
  return { element, triggerFull, exitFull };
};
const App = () => {
  const onFullScreen = (isFull) => {
    console.log(isFull ? "We are Full" : "We are Small");
  }; // 풀스크린이 될 때 & 다시 되돌아올 때 실행될 콜백함수. 다만 esc 키로 나갈 때는 예외적으로 실행되지 않음.
  const { element, triggerFull, exitFull } = useFullscreen(onFullScreen);
  return (
    <div className="App">
      <div ref={element}>
        <img
          src="https://dotnet.microsoft.com/static/images/illustrations/swimlane-real-time-chat-app.svg?v=QIfYDsyVv0EaNJhym3S-R09QM0HDbOQ8ujwjfLpNeT0"
          alt="just a pic"
        />
        <button onClick={exitFull}>Exit Fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make Fullscreen</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
