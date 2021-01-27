/*
  useEffect(effect, [dependencies]) 
  - effect의 기본 JS 코드 : 컴포넌트 생성 + 변화시 실행.
    : componentDidMount & componentDidUpdate의 기능.
  - effect 내부에서 다시 함수 return : 컴포넌트 소멸시 해당 함수 실행.
    : componentWillUnmount와 동일한 기능.
  - deps가 빈 배열인 경우 componentDidMount일 때만 기본 JS 코드 실행
*/
import { useEffect } from "react";
import ReactDOM from "react-dom";

const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== "function") {
    return;
  }
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle); // 기본적으로 컴포넌트 생성 + 변화시 실행.
    return () => document.removeEventListener("mouseleave", handle); // componentWillUnmount일 때 이벤트 클리닝
  }, []); // componentDidMount일 때만 실행. 컴포넌트 생성시에만 이벤트 리스너 1번 추가.
};
const App = () => {
  const begForLife = () => console.log("Plz dont leave!");
  useBeforeLeave(begForLife);
  return <div className="App">Hello!</div>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// ============================================================
// ============================================================
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("click", onClick);
    } // componentDidMount & componentDidUpdate에 의해 호출됨.
    return () => {
      if (element) {
        element.removeEventListener("click", onClick);
      } // componentWillUnmount에 의해 호출됨.
    };
  }, []); // deps가 빈 배열이므로 componentDidMount일 때만 호출

  return ref;
};

const App = () => {
  const sayHello = () => console.log("Say Hello!");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}>Hello!</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
