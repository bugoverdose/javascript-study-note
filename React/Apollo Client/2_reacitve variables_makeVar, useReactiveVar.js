/*
  reacitve variables : Local-only Fields의 값으로 사용.
  - 앱 어디서든 local state에 접근하고 내용 수정 가능. (별도의 graphQL 작업 불필요)
  - Apollo client(프론트엔드)에 state들 저장됨.
  - 해당 Local-only Field의 local state 값 변경되면 
    해당 필드를 포함하는 모든 query들은 자동 새로고침됨. re-rendering
  
  makeVar(디폴트값) : reacitve variables 생성.
  useReactiveVar : gql문 없이 해당 reacitve variable에 직접 접근 + 업데이트되면 re-render되는 Hook. 
*/
// 1) ApolloClient의 cache에 typePolicies 옵션으로 local only field 설정.
// [apollo.ts]
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const isLoggedInVar = makeVar(false); // reactive variable 생성. 디폴트값은 false.

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            // local only field명: isLoggedIn
            read() {
              return isLoggedInVar(); // 실행하는 방법으로 reactive variable 값 설정.
            }, // read 메서드: 해당 isLoggedIn 필드에 담기는 값을 return
          },
        },
      },
    },
  }),
});

// ==============================================================
// 2) useReactiveVar 훅 : gql문 없이 해당 local only field에 직접 접근 + 업데이트되면 re-render되는 Hook.
// [App.tsx]
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar); // gql문 없이 해당 local only field에 직접 접근 + 업데이트되면 re-render되는 Hook.
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;

// ==============================================================
// 3) reactive variable의 값 업데이트.
// [routers/logged-out-router.tsx]
import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true); // 해당 reactive variable의 값을 true로 변경.
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Click to Login</button>
    </div>
  );
};

// ==============================================================
