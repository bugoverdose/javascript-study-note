/*
  input 태그에 입력되는 내용 제약 + 이벤트 활용.
  - defaultValue: input의 초기 value.
  - validator: input에 입력가능한 내용의 조건 

  {...name}의 의미 : value={name.value} onChange={name.onChange}
*/
import { useState } from "react";
import ReactDOM from "react-dom";

const useInput = (defaultValue, validator) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event) => {
    const {
      target: { value }, // event.target.value
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value); // update an intput value
      console.log(event.target);
    }
  };
  return { value, onChange };
};

const App = () => {
  const validator = (value) => {
    return !value.includes("@") && value.length <= 10;
  }; // @ 포함 불가 조건 + 최대 10글자까지만 입력 가능 조건
  const name = useInput("Mr. ", validator);
  return (
    <div className="App">
      <input {...name} placeholder="Name" />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
