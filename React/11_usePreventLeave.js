/*
  사용자가 페이지를 벗어나려고 할 때를 감지. 
  : 변경사항을 저장하지 않고 떠나는 등 API에 무언가를 보내는 도중에는 떠나지 못하도록 보호 활성화.
  - usePreventLeave 함수를 실행하면서 두 함수 빼내기.
  - enablePrevent : 페이지 떠나기 전에 승인 받기 기능 활성화 함수.
  - disablePrevent : 자유롭게 페이지 떠날 수 있도록 비활성화시켜주는 함수.

  cf) beforeunload 이벤트 : 사용자가 페이지를 떠나기 직전.
*/
import ReactDOM from "react-dom";

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
