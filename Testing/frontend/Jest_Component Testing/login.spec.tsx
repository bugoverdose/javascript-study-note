/*
  커스텀 render를 사용하지 않는 경우.
*/
import React from "react";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Login, LOGIN_MUTATION } from "../login";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { LOCALSTORAGE_TOKEN } from "../../constants";

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
  }); // beforeEach : 각각의 it 실행시 맨 처음에 재실행.

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Uber Eats");
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "wrong@emailFormat");
      userEvent.click(document.body); // onBlur 모드이므로 외부 클릭 과정 필요.
    });
    let validEmailError = getByRole("alert");
    expect(validEmailError).toHaveTextContent(/Invalid Email Address/i);

    await waitFor(() => {
      userEvent.clear(email);
      userEvent.click(document.body);
    });
    validEmailError = getByRole("alert");
    expect(validEmailError).toHaveTextContent(/Email is required/i);
  });

  it("displays password validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "thisWillWork@gmail.com");
      userEvent.click(submitBtn);
    });
    let validPasswordError = getByRole("alert");
    expect(validPasswordError).toHaveTextContent(/Password is required/i);

    await waitFor(() => {
      userEvent.type(password, "1234567");
      userEvent.click(submitBtn);
    });
    validPasswordError = getByRole("alert");
    expect(validPasswordError).toHaveTextContent(
      "Password must be more than 8 characters."
    );
  });

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

  it("displays mutation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const validFormData = {
      email: "real@gmail.com",
      password: "testtest", // DB로 실제로 가지는 않음. form validation 통과할 데이터.
    };

    const mockedMutationResponseError = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "asdasdasdasd",
          error: "mutation-error",
        },
      },
    });
    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponseError);
    await waitFor(() => {
      userEvent.type(email, validFormData.email);
      userEvent.type(password, validFormData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponseError).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponseError).toHaveBeenCalledWith({
      loginInput: {
        email: validFormData.email,
        password: validFormData.password,
      },
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("mutation-error");
  });
});
