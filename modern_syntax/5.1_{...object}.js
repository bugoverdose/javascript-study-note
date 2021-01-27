/*
  중괄호 내부에서 사용할 경우 객체도 펼치기 연산자 적용 가능.
  - React에서 html element에 여러 속성+값 대입할 때 활용 가능.
  - 여러 객체를 하나의 객체처럼 사용하기 위해 활용 가능. React에서 prop값 대입시 유용. 
  - {...object1, ...object2}
*/
const part1 = { h: "head", s: "shoulders" };
const part2 = { k: "knees", t: "toes" };
console.log({ ...part1, ...part2 });
// {h: "head", s: "shoulders", k: "knees", t: "toes"}

// ---------------------------------------
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useFadeIn = () => {
  const element = useRef();
  useEffect(() => {});
  return { ref: element, style: { opacity: 0.5 } };
};
const App = () => {
  const fadeInH1 = useFadeIn();
  return (
    <div className="App">
      <h1 {...fadeInH1}>Hello!</h1>
    </div>
  ); // <h1 ref={element} style={{ opacity: 0.5 }}>Hello!</h1>와 동일
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// ---------------------------------------
// React Native. style prop에 복수의 css 객체 적용하기.
import React from "react";
export default Weather = () => {
  return (
    <View style={{ ...styles.inner_container, ...styles.textContainer }}></View>
  );
};
const styles = StyleSheet.create({
  inner_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
  },
});
