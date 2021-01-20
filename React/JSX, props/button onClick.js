/*
  button 태그에는 onClick prop이 제공됨. (React magic) 
   - eventListener와 불필요.
   - onClick prop의 값으로 콜백함수 지정해주면 됨.
     <button onClick={this.add}> Add </button>
*/

class App extends React.Component {
  state = {
    count: 0,
  };
  add = () => {
    console.log("add");
  };
  minus = () => {
    console.log("minus");
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
