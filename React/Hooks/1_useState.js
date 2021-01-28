/*
  useState : state 설정 및 변경 기능
  1) 인자로 state로 사용할 item의 초기값 설정 가능.
  2) 두 가지 값의 배열을 return. 명칭은 자유.
     - item. state의 특정 변수. 
     - setItem. 해당 item의 값을 변경하는 modifier.
 
  기본형식
    const [item, setItem] = useState(1);
    const incrementItem = () => setItem(item + 1);

  cf) 한가지만 선택하고 싶은 경우.
   const item = useState(1)[0];   &   const setItem = useState(1)[1];
*/
import { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  return (
    <div className="App">
      <h1>{item}</h1>
      <button onClick={incrementItem}>Plus</button>
      <button onClick={decrementItem}>Minus</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
