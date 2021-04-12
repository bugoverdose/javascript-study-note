/*
  jest.spyOn(Storage.prototype, "setItem");
  expect(localStorage.setItem).toHaveBeenCalledWith("authentication-token", "asdasdasdasd");

  => localStorage.setItem(LOCALSTORAGE_TOKEN, token); 부분 테스트 목적
*/
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
// ================================================================================

describe("Login", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;
  // ~~
  it("submitting form calls mutation & saves on localStorage", async () => {
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

    jest.spyOn(Storage.prototype, "setItem");
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCALSTORAGE_TOKEN,
      "asdasdasdasd"
    );
  });
});
