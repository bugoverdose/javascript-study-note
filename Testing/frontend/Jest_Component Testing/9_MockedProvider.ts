/*
  MockedProvider : apollo client 기능 활용시, MockedProvider로 감싸서 render 필요.
  - useQuery 등 apollo client를 활용하는 기능들이 있을 때 필요.
  - import { MockedProvider } from "@apollo/client/testing";

  ApolloProvider를 mock하는 방법.
*/
import { MockedProvider } from "@apollo/client/testing";

describe("Header", () => {
  it("renders OK with props", () => {
    const { getByText } = render(
      <MockedProvider>
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );
  });
});

// ==============================================================
// [index.tsx] 참고
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ==============================================================
