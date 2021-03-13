/*
  현재 url을 그대로 읽어오는 방법들.
  - useLocation() : 객체 형식으로 url의 데이터들 가져오기.
  - window.location.href : url 그대로 복사해오기.

  cf) useLocation() & useParam()으로 훅 만들어서 활용 가능.
*/
// http://localhost:3000/confirm?code=asdjbjsgh

import { useLocation } from "react-router";
const location = useLocation();
// {pathname: "/confirm", search: "?code=asdjbjsgh", hash: "", state: undefined}

console.log(location.search); // ?code=asdjbjsgh

// =============================================================

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const param = useParam();
const verifyCode = param.get("code");

// ==============================================================
console.log(window.location.href); // 바닐라JS: window.location.href 활용.
// http://localhost:3000/confirm?code=asdjbjsgh

console.log(window.location.href.split("?code=")[1]); // asdjbjsgh

const [_, code] = window.location.href.split("?code=");
console.log(code); // asdjbjsgh

// ==============================================================
