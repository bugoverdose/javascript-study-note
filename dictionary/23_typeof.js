// typeof 대상 === "function" // 대상이 함수인 경우 true

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    } // componentDidMount & componentDidUpdate에 의해 호출됨.
    return (element) => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      } // componentWillUnmount에 의해 호출됨.
    };
  }, []); // deps가 빈 배열이므로 componentDidUpdate일 때는 호출X
  return element;
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

// ===============================================
import { useState } from "react";
import ReactDOM from "react-dom";

const useInput = (defaultValue, validator) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event) => {
    const {
      target: { value }, // event.target.value
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value); // update an intput value
      console.log(event.target);
    }
  };
  return { value, onChange };
};

const App = () => {
  const validator = (value) => {
    return !value.includes("@") && value.length <= 10;
  }; // @ 포함 불가 조건 + 최대 10글자까지만 입력 가능 조건
  const name = useInput("Mr. ", validator);
  return (
    <div className="App">
      <input {...name} placeholder="Name" />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
