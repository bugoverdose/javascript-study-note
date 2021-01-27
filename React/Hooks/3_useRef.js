/*
  useRef : 컴포넌트의 특정 부분을 선택하고 조작하기 위한 기능.
  - React의 모든 컴포넌트는 reference 속성을 지님.
  - useRef로 reference를 생성하여 특정 html element의 ref 속성의 값으로 대입.
  => 특정 html element와 상호작용 가능해짐.
*/
import { useRef } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const potato = useRef();
  console.log(potato); // current: <input placeholder="Hi!"></input>
  setTimeout(() => potato.current?.focus(), 3000); // 자동으로 해당 input 태그를 선택해줌.
  return (
    <div className="App">
      <input ref={potato} placeholder="Hi!" />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
