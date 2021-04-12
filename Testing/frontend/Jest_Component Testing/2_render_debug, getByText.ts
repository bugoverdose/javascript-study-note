/*
  render(<컴포넌트 prop={~} />) : 특정 컴포넌트의 렌더링 결과 테스트 기능.
  - @testing-library/react
  - debug, getByText 등 기능들 활용하여 컴포넌트 렌더링 결과 세부 테스트 가능.
*/
render(<App />) // 렌더링 성공 여부만 체크.

const { debug, getByText } = render(<App />);
debug() // 콭솔에 출력
<body>
<div>
  <span>
    logged-out
  </span>
</div>
</body>

getByText("logged-out"); // 해당 문구와 일치하는 경우 테스트 통과. 테스트 실패시 debug() 실행.

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
  it("renders LoggedOutRouter", () => {
    const { debug, getByText } = render(<App />);
    debug();
    getByText("logged-out");
  });
});

// ==============================================================================================
