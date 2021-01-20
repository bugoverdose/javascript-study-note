/* 
componentDidMount() : 최초로 컴포넌트가 생성되었을 때(웹페이지가 로드되었을 때), render 직후 실행됨.

로딩 기능 
- 처음에는 "Loading" 출력 (isLoading: true)
- 로딩 끝나면 componentDidMount 실행. 
  => setTimeout에 따라 3000ms(3초) 후 setState 실행하여 state 수정
  => "We are ready" 출력 (isLoading: false)
*/

[App.js];
import React from "react";
class App extends React.Component {
  state = {
    isLoading: true,
    movies: [], // default 값 지정하는 것이 good practice.
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  } // 최초로 컴포넌트가 render되었을 때 (Mounting)
  render() {
    const { isLoading } = this.state;
    return <div>{isLoading ? "Loading" : "We are ready"}</div>;
  }
}
export default App;

// this.state의 isLoading 값을 render에서 사용할 isLoading 변수의 값으로 사용.
// isLoading이 참이면 "Loading" / 거짓이면 "We are ready" (ternary operator)
