/*
  특정 element에 대한 클릭 이벤트 핸들링. 컴포넌트 소멸시 이벤트 클린업 기능.
  - 이벤트 발생시 실행할 콜백함수를 인자로 대입.
  - 특정 ref에 할당하고, 특정 element의 ref 속성 값으로 대입.
*/
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
