/*
  useFadeIn : 컴포넌트가 서서히 나타나도록. 모든 element에 적용 가능한 fade in 애니메이션.
  - durtaion : 디폴트 값은 1초. 인자를 대입하지 않으면 1초에 걸쳐 fade in 적용.
  - delay : 디폴트 값은 0초. 인자를 대입하지 않으면 0초 후에 즉시 fade in 시작.
*/
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const useFadeIn = (duration = 1, delay = 0) => {
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const {
        current: { style },
      } = element;
      style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};
const App = () => {
  const fadeInH1 = useFadeIn(2); // 0초 후 2초에 걸쳐 fade in
  const fadeInP = useFadeIn(3, 5); // 5초 후, 3초에 걸쳐 fade in
  return (
    <div className="App">
      <h1 {...fadeInH1}>Hello!</h1>
      <p {...fadeInP}>lorem ipsum asdsdgdfg</p>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
