/*
  mock-apollo-client : query/mutation을 제대로 테스트하는 라이브러리. 세부적인 통제.
  - ApolloProvider 그대로 사용. client만 mock하는 방법.

  0) npm i mock-apollo-client --save-dev
  1) import { createMockClient } from "mock-apollo-client"; // not from "@apollo/client/testing";

  - const mockedClient = createMockClient();
  - <ApolloProvider client={mockedClient}> ~ </ApolloProvider>
*/
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client"; // not from "@apollo/client/testing";

describe("Login", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
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
});
