/*
  일반적인 switch문과 동일. 
  - switch (비교대상)
  - case 비교값: 비교값이 해당 비교갑과 동일할 경우 case 실행
  - default: 모든 case에 부합하지 않는 경우. if문의 else와 동일.
*/
import { createStore } from "redux";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return count + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

// 위와 동일
const reducer2 = (state = 0, action) => {
  if (action.type === "ADD") {
    return state + 1;
  } else if (action.type === "MINUS") {
    return state - 1;
  } else {
    return state; // 반환되는 값이 store에 담기는 state 값
  }
};

const store = createStore(reducer);
