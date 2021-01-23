/*
  객체의 특정 key의 값 선택 방법.
  - 객체.key
  - 객체["key"]
*/
const weatherOptions = {
  Clouds: {
    iconName: "cloud-outline",
    gradient: ["#D4D3DD", "#EFEFBB"],
  },
};
// 1) 객체.key : 변수명으로써 선택하는 경우
weatherOptions.Clouds.iconName; // // "cloud-outline"

// 2) 객체["key"] : 문자열을 활용해야 하는 경우
weatherOptions["Clouds"].iconName; // "cloud-outline"
