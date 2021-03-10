/*
  onSubmit: form에서 <input type="submit" /> 클릭시 실행할 함수.
  onChange: input에서 value 변화시 실행할 함수를 대입하는 속성.
*/
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value }, // event.target.name & event.target.value
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault(); // submit했을 때 새로고침되지 않도록 = React 코드, state 등 초기화되지 않도록.
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email} // state의 email 변수 값으로 설정.
          required
          onChange={onChange} // 입력한 값에 맞춰 state의 email값도 변경시켜줘야 value에 반영됨.
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
