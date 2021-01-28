/*
  사용자가 스크롤 다운하여 특정 지점을 지나갈 때 색상 변경 등.
  - x 혹은 y를 꺼내서 조건문에 활용.
*/
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 });
  const onScroll = (event) => {
    setState({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll); // 이벤트 클린업
  }, []);
  return state;
};
const App = () => {
  const { y } = useScroll();
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
        Hello!
      </h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
