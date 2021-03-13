// 현재 url의 parameter 부분(?code=~~)만 읽는 방법.
import { useLocation } from "react-router";

function useQueryParam() {
  return new URLSearchParams(useLocation().search);
}
const param = useQueryParam();
const verifyCode = param.get("code");
console.log(verifyCode);

// ==============================================================
// [useQsParam.tsx] Hook화.
import { useLocation } from "react-router-dom";

export const useQsParam = (string: string) => {
  return new URLSearchParams(useLocation().search).get(string);
};

// [confirm-email.tsx] Hook 활용.
const getParam = useQsParam("code");
useEffect(() => {
  console.log(getParam);
}, []);

// ==============================================================
// vanillaJS Hook화
export const useQueryParams = (string: string) => {
  const [_, code] = window.location.href.split(`${string}=`);
  return code;
};

// ==============================================================
