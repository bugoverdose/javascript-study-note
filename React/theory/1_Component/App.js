import React from "react";
import PropTypes from "prop-types";

const Food = ({ fav, spiciness }) => {
  return (
    <h2>
      {fav}'s spiciness is {spiciness}
    </h2>
  );
};
Food.propTypes = {
  name: PropTypes.string.isRequired,
  spiciness: PropTypes.number.isRequired,
};

let foods = [
  { id: 1, name: "kimchi", spiciness: 4 }, // 각각 매개변수 dish에 담기게 됨.
  { id: 2, name: "ramen", spiciness: 5 },
  { id: 3, name: "curry", spiciness: 1 },
];

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
// {중괄호} 내부에는 동적으로 생성된 Food 컴포넌트들의 배열이 return됨.

export default App;
