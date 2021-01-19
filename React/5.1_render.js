/*
(1) function component : 그 자체로 함수이기 때문에 html 코드를 직접 return 가능
	• 함수 형식. 
	• return을 통해 html 코드(JSX)를 반환하는 함수.
*/
const App = () => {
  return <h1>I am a Function Component</h1>;
};

// ===================================================
/*
(2) class component : render 메서드를 통해 html 코드 return 가능. state 활용 가능.
	• 클래스 형식. React.Component로부터 extends하면서 모든 속성,메서드를 상속받음.
	• render 메서드를 통해 html 코드를 반환. (함수가 아니므로 return하지 않음)
       => React는 자동으로 class component의 render 메서드를 실행시켜줌.
*/
class App extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return <h1>I am a Class Component</h1>;
  }
}
// App class component가 React class component의 render 메서드 등을 상속받는 것.
// 클래스이기 때문에 내부에서 state 객체를 만들어서 동적 데이터 활용 가능.

// ======================================================
/*
{this.state.변수명} 
: render 메서드에서 return되는 html 태그들 사이에 대입할 때만 this.state로 직접 지정.
: 현재 위치한 클래스(=this)의 state의 특정 변수의 값 선택.

- setState 등에서는 current 활용. this.state로 직접 변경 금지.
*/

// this.state.count. 실전에서는 destructuring으로 꺼내서 사용.
class App extends React.Component {
  state = {
    count: 0,
  };
  add = () => {
    console.log("add");
  };
  render() {
    const { count } = this.state; // this.state.count
    return (
      <div>
        <h1>The number is {count}</h1>
        <button onClick={this.add}>Add</button>
      </div>
    );
  }
}
