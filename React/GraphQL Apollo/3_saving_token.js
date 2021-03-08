/*
  local storage & reacitve variables를 활용하여 토큰 저장 가능.
  
  1) login mutation 성공시 localstorage에 토큰을 저장. localStorage.setItem(key, token)

  2) 최우선으로 로그인하면 토큰을 localstorage에서 확인. localStorage.getItem(token)
     : 웹사이트 나갔다 돌아왔을 때 localstorage에 token 존재 => 자동로그인
*/
// [constants.ts]
export const LOCALSTORAGE_TOKEN = "authentication-token";

// ======================================================================
// [apollo.ts]
const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
// 웹사이트 나갔다 돌아왔을 때도 token이 유지되도록 local storage에 저장해서 활용.

export const isLoggedInVar = makeVar(Boolean(token)); // reactive variable 생성. 토큰이 없으면 디폴트 값은 false.
export const authTokenVar = makeVar(token); // 로그인되지 않았으면 디폴트값은 null
// isLoggedInVar(true), authTokenVar(token)처럼 값 업데이트 가능. 새로운 값을 인자에 대입하면서 실행.

// ======================================================================
// [login.tsx]
const onMutationCompleted = (data: LoginMutation) => {
  const {
    login: { ok, token },
  } = data;
  if (ok && token) {
    localStorage.setItem(LOCALSTORAGE_TOKEN, token); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
    authTokenVar(token);
    isLoggedInVar(true); // apollo.ts에서 설정한 reactive variable둘의 값 업데이트.
  }
};

// ======================================================================
