// 배열.filter(조건) : 해당 조건에 해당되는 요소들만 걸러주는 배열 메서드.
const people = [
  { id: 0, name: "Nico", age: 18, gender: "female" },
  { id: 1, name: "Mico", age: 18, gender: "female" },
  { id: 2, name: "Tico", age: 18, gender: "female" },
  { id: 3, name: "Pico", age: 18, gender: "female" },
];

const getById = (id) => {
  const filteredPeople = people.filter((person) => id === person.id);
  return filteredPeople[0];
};

getById(3);
// {id: 3, name: "Pico", age: 18, gender: "female"}
