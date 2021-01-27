/*
  마우스가 해당 페이지를 벗어났을 때 특정 함수 실행.
  - 마우스가 화면 최상단으로 벗어났을 때 인자로 대입한 콜백함수 실행. (clientY <= 0)

  cf) mouseleave 이벤트 : 마우스가 특정 대상을 벗어난 시점.
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
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};
const App = () => {
  const begForLife = () => console.log("Plz dont leave!");
  useBeforeLeave(begForLife);
  return <div className="App">Hello!</div>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
