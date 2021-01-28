/*
  사용자에게 질문하고 승인 여부에 따라 다른 함수 실행하는 기능. (삭제, 변경 등)
  인자1) message : 사용자에게 물어볼 메시지.
  인자2) onConfirm : 승인시 실행할 함수. 필수.
  인자3) onCancel : 거절시 실행할 함수. 선택.
*/
import ReactDOM from "react-dom";

const useConfirm = (message, onConfirm, onCancel) => {
  if (typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return; // onCancel은 필수가 아님. onCancel이 존재함에도 함수가 아닌 경우 종료.
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      try {
        onCancel();
      } catch (error) {
        return;
      }
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("OK! Deleted the world!");
  const abort = () => console.log("Aborted! That was close.");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world!</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
