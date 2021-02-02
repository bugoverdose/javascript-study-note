/* 
  typeof 대상 === "타입" // 대상의 타입에 따라 true/false 출력
  - typeof title === "string" // 문자열이면 true
  - typeof onClick === "function" // 함수면 true

  cf) genres instanceof Array // 생성자 함수 Array의 인스턴스, 즉 배열이면 true
*/
export const addMovie = ({ title, synopsis, genres }) => {
  if (typeof title !== "string" || typeof synopsis !== "string") {
    throw Error("❌  title and synopsis should be strings  ❌");
  }
  if (!genres instanceof Array) {
    throw Error("❌  genres should be an array  ❌");
  }
  const id = Math.floor(Math.random() * (title.length + Date.now())); // 매우 낮은 가능성이지만 id 중복될 가능성 존재.
  movies = [{ id, title, synopsis, genres }, ...movies];
};

// ==============================================================
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
