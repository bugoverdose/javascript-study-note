/*
  useState를 활용한 input 태그의 이벤트 활용 방법

  {...name}의 의미 : value={name.value} onChange={name.onChange}
*/
import { useState } from "react";
import ReactDOM from "react-dom";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event) => {
    setValue(event.target.value); // update an intput value
    console.log(event.target);
  };
  return { value, onChange };
};

const App = () => {
  const name = useInput("Mr. ");
  return (
    <div className="App">
      <input {...name} placeholder="Name" />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
