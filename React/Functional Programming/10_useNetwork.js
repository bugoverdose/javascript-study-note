/*
  navigator가 online/offline 상태가 변화했을 때 특정 함수 실행.
  - 함수 실행하여 특정 변수에 할당 => online/offline 여부에 따라 true/false 변화.
  - 인자로 콜백함수 대입시, online/offline 여부에 따라 해당 콜백함수 실행.

  cf) navigator.onLine : 현재 온라인 여부에 따라 true/false로 출력.
*/
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};

const App = () => {
  const handleNetworkChange = (online) => {
    console.log(online ? "We are Online" : "We are Offline");
  };
  const onLine = useNetwork(handleNetworkChange);
  return (
    <div className="App">
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
