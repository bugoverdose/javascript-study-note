// 배열의 첫번째 요소 꺼내기.
const errors = [
  {
    message: "Forbidden resource",
    path: ["loggedInUser"],
    extensions: { code: "INTERNAL_SERVER_ERROR", exception: [Object] },
  },
];

const [error] = errors;
console.log(error.message); // Forbidden resource
console.log(error.extensions.code); // INTERNAL_SERVER_ERROR

// ==================================================================
// 배열의 여러 요소 꺼내기
const verificationDB = [
  { id: 2, code: "bc32f16b-d665-4e6d-96e3-a087c2d3eba0" },
  { id: 3, code: "0f76e7dd-9ef1-4185-9927-a96a830d6c5c" },
];

const [verification1, verification2] = verificationDB;

console.log(verification1);
// {id: 2, code: "bc32f16b-d665-4e6d-96e3-a087c2d3eba0"}

console.log(verification2);
// {id: 3, code: "0f76e7dd-9ef1-4185-9927-a96a830d6c5c"}
