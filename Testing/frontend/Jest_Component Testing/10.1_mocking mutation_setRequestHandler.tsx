/*
  mockClient = createMockClient();

  const 요청 결과 = jest.fn().mockResolvedValue({ 
      data: {
        createAccount: {
          ok: true,
          error: null,
        },
      },
    });

  mockClient.setRequestHandler(gql문, 요청 결과)
  - 특정 gql문 요청(mutation 등)에 대해 해당 요청 결과가 반환되는 것처럼 mock하기.   
*/
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";

describe("Login", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <HelmetProvider>
            <Router>
              <Login />
            </Router>
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const validFormData = {
      email: "real@gmail.com",
      password: "testtest", // DB로 실제로 가지는 않음. form validation 통과할 데이터.
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "asdasdasdasd",
          error: null,
        },
      },
    });
    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse); // LOGIN_MUTATION : 실제 gql문
    await waitFor(() => {
      userEvent.type(email, validFormData.email);
      userEvent.type(password, validFormData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: validFormData.email,
        password: validFormData.password,
      },
    });
  });
});

// ==================================
export const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInputDto!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;
