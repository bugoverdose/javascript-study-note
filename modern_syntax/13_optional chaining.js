/*
  ?. 연산자는 .와 사실상 동일 기능. 
  - React가 너무 빨리 동작해서 잠시 element가 undefined가 되는 등의 에러 예방 가능.

  potato.current.focus(), 3000);
  potato.current?.focus(), 3000);
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
