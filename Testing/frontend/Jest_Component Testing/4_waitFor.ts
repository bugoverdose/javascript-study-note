/*
  waitFor(()=>{
    render하기 전에 앱 내부에서 발생할 상황(특정 변수 값 변화 등)
    query문 실행하고 컴포넌트 render 등
  })
*/
// [src/components/App.tsx]
export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};

export default App;
// ==============================================================================================
// [src/components/__tests__/app.spec.tsx]
import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "../App";
import { isLoggedInVar } from "../../apollo";

jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe("App", () => {
  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText("logged-in");
  });
});

// ==============================================================================================
