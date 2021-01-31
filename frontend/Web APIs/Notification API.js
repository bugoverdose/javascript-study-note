/*
  알람 기능. 자동으로 알람 권한 요청 후 알람 전송해주는 함수 생성.
  - 첫번재 인자는 알람의 title
  - 두번째 인자는 해당 알람의 options 적용 가능. 객체로 전달 필요. 

  Notification api : https://developer.mozilla.org/en-US/docs/Web/API/Notification
*/
import ReactDOM from "react-dom";

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return; // window.Notification에 접근불가능한 경우 함수 종료.
  }
  const fireNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
          // 알람 권한이 없는 경우 요청. 승인해줄 경우 알람 실행.
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options); // 이미 알람 권한이 있는 경우 실행.
    }
  };
  return fireNotification;
};
const App = () => {
  const triggerNotification = useNotification("Hello!!", {
    body: "I am the body option! Check mdn for other options)",
  });
  return (
    <div className="App">
      <button onClick={triggerNotification}>Alarm!</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
