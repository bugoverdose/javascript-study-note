/*
  mocking components : 특정 html 태그를 반환하는 함수로 재정의.
*/
// [src/components/App.tsx]
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { LoggedOutRouter } from "../routers/logged-out-router";
import { LoggedInRouter } from "../routers/logged-in-router";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar); // gql문 없이 해당 local only field에 직접 접근 + 업데이트되면 re-render되는 Hook.
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};

export default App;
// ==============================================================================================
// [src/components/__tests__/app.spec.tsx]
import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});
jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe("App", () => {
  it("renders OK", () => {
    render(<App />);
  });
});

// ==============================================================================================
