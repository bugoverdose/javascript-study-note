/*
 1) setState() : state 값 변경 + 변경된 state를 토대로 render 메서드 재실행
  - 실행할 함수에서 state의 데이터를 변경하는 방법.
  - state의 데이터가 변경될 때마다 자동으로 render 메서드를 다시 호출해주는 메서드
    => 별도의 새로고침 없이 변경된 state 값을 즉시 웹사이트에 반영해주는 기능. (virtual DOM 덕분에 즉시 반영 가능)

원칙: "Do not mutate the state directly, Use setState()"
- 문제점: this.state로 값을 직접적으로 변형시키면 자동으로 render되지 않음. 

this.setState( {newState} ) 
  - 인자에 새로운 state 객체를 대입하여 state의 데이터 변경.
=================================================
 2) current 활용: 화살표 함수로 새로운 state 객체를 setState의 인자로 사용.

 this.setState( current => ({newState}) ) 
  - current : 현재 state 값. state를 직접 선택하지 않고 state를 set하는 방법.
            this.state와 실질적으로 동일. 다만, React를 통해 접근하는 방법.
  - 화살표 함수 형식으로 결과적으로 새로운 state 객체를 인자로 return
*/
class App extends React.Component {
  state = {
    count: 0,
  };
  add = () => {
    this.setState((current) => ({ count: current.count + 1 }));
    // this.setState({ count: this.state.count + 1 }); // bad practice
  };
  minus = () => {
    this.setState((current) => ({ count: current.count - 1 }));
  };
  render() {
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
  }
}

// ----------------------------------------------
/* 비교) Bad Practice
- 콜백함수에서는 this.state는 사용하지 않기.
- setState 내부에서도 state 직접 변경하지 말기. 성능 문제. => current 사용.

  add = () => {
	this.state.count = 1;
  };
  minus = () => {
    this.setState({ count: this.state.count - 1 });
  };
*/
