/*
  useState를 활용한 메뉴 내비게이션 용도. 화면에 표시되는 정보 변경하는 방법. re-rendering
*/
import { useState } from "react";
import ReactDOM from "react-dom";

const navigation = [
  {
    tab: "Section 1",
    content: "I am the content of Section 1",
  },
  {
    tab: "Section 2",
    content: "I am the content of Section 2",
  },
];

const useTabs = (initialIndex, arrayData) => {
  if (!arrayData || !Array.isArray(arrayData)) {
    return; // 두번째 인자가 없거나, 배열 데이터가 아닌 경우 함수 종료.
  }
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  return {
    currentItem: arrayData[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, navigation);
  return (
    <div className="App">
      {navigation.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
