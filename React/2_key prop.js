/*
Dynamic Component Generation 기본 원리
1) 배열의 각 요소는 하나의 데이터 객체.
2) App 컴포넌트에서 배열.map을 통해 배열의 각 요소를 props로 전달하여
   동적으로 컴포넌트들 생성 => 컴포넌트들의 배열 return.

- 클라이언트로부터 될 정보를 토대로 dynamic data를 웹사이트에 추가하는 방법.
- 데이터 객체들의 배열 + map 메서드 => react component array

==================================================================
[key prop] : "Each child in a list should have a unique "key" prop."
1) 배열의 각 데이터에 사전에 id를 부여 필요.
- let data = [{ id: 1, XXX: 값, XXXX: 값 }, { id: 2, XXX: 값, XXXX: 값 }, ... ]

2) 컴포넌트 생성시 key prop에 id 전달 필요.
- <Component key={data.id} prop1={data.XXX} prop2={data.XXXX} />

* React의 모든 html element들은 unique해야 함. 
  하지만 배열 내부에 생성된 컴포넌트들은 고유성을 상실하게 됨.
=======================================
(이해)
- key prop에 id(고유번호)도 함께 전달. (for react internal use)
- 다만, 생성되는 Component 자체에는 key prop에 전달된 값을 전달하지 않음.
- React에서 내부적으로 사용하기 위해 지정될 뿐임.
*/

const Food = ({ fav, spiciness }) => {
  return (
    <h2>
      {fav}'s spiciness is {spiciness}
    </h2>
  );
};

// 데이터 객체들의 배열. 각 객체는 매개변수 dish에 담기게 됨.
let foods = [
  { id: 1, name: "kimchi", spiciness: 4 },
  { id: 2, name: "ramen", spiciness: 5 },
  { id: 3, name: "curry", spiciness: 1 },
];

// map메서드로 동적으로 생성된 Food 컴포넌트들의 배열이 return됨. {컴포넌트 배열}
const App = () => {
  return (
    <div>
      <h1>I am App Component</h1>
      {foods.map((dish) => (
        <Food key={dish.id} fav={dish.name} spiciness={dish.spiciness} />
      ))}
    </div>
  );
};

export default App;

// ==================================================================
// (이해) 하드코딩 버전. map 메서드의 결과와 동일.
const App = () => {
  return (
    <div>
      <h1>I am App Component</h1>
      {[
        <Food fav="kimchi" spiciness={4} />,
        <Food fav="ramen" spiciness={5} />,
        <Food fav="curry" spiciness={1} />,
      ]}
    </div>
  );
};

// (이해) 배열로 나열되어있든 꺼내져있든 동일 결과
const App = () => {
  return (
    <div>
      <h1>I am App Component</h1>
      <Food fav="kimchi" spiciness={4} />,
      <Food fav="ramen" spiciness={5} />,
      <Food fav="curry" spiciness={1} />,
    </div>
  );
};
