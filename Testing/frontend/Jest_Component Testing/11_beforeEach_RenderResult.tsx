/*
  beforeEach : 각각의 it 실행할 때마다 매번 처음에 재실행.
  - RenderResult 타입으로 컴포넌트 렌더링된 결과 받아서 활용.
*/
// 핵심 요약
let renderResult: RenderResult;

beforeEach(async () => {
  renderResult = render(<Login />)
}

it("should render OK", async () => {
    const { getByText, debug } = renderResult;
}
// ===============================================================
import React from "react";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";

describe("Login", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Router>
              <Login />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  }); // beforeEach : 각각의 it 실행시 맨 처음에 재실행.

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Uber Eats");
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText("Email");
  });
});
// ===============================================================