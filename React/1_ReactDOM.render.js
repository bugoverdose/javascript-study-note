/* 
[컴포넌트 render 대원칙] 
- 기본적으로 한번에 하나의 컴포넌트만 render 가능
- 다른 컴포넌트들은 App 컴포넌트 내부에 넣고, 
  최종적으로 App 컴포넌트 1개만 index.js에서 render해서 사용.

cf) 복수의 component를 사용 방법: React.StrictMode 태그 사이에 넣어서 사용.
*/
// [App.js]
const Potato = () => <h1>I am Potato Component</h1>;
const App = () => {
  return (
    <div>
      <h1>I am App Component</h1>
      <Potato />
    </div>
  );
};
export default App;

// [index.js]
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));
