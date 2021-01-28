/*
  useEffect(effect, [dependencies]);
  1) effect : 실행시킬 함수를 첫번째 인자로 받음. 
  2) deps : 두번째 인자로 준 배열의 값 중 하나가 생성+변했을 때만 effect가 실행됨.  
          : [] 빈 배열을 주면 업데이트 방지. 컴포넌트 생성시에만 effect 실행 (componentDidMount만)
  3) effect 내부에서 함수 return: 컴포넌트 소멸시 해당 함수 실행(componentWillUnmount일 때 추가)
          
  useEffect(sayHello)
  - 모든 컴포넌트에 대해 생성+변화시 sayHello effect 실행.
  - componentDidMount & componentDidUpdate의 기능.

  useEffect(sayHello, [number]);
  - number라는 state가 생성 + 변화할 때마다 sayHello effect 실행
  - componentDidMount & componentDidUpdate의 기능.
  
  useEffect(sayHello, []);
  - 처음에 딱 한번만 sayHello effect 실행.
  - componentDidMount의 기능. []로 인해 업데이트 방지됨.
*/
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const sayHello = () => console.log("hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);
  useEffect(sayHello, [number]);
  return (
    <div className="App">
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
