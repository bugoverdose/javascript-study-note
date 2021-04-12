import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client"; // 주의
import { render, waitFor, RenderResult } from "../../test-utils"; // 주의. "@testing-library/react"는 전부 다시 export됨.
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../generated_api_types/globalTypes";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("CreateAccount", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient(); // from "mock-apollo-client"
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Uber Eats")
    );
  });

  it("should display validation errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "invalid@Email");
      userEvent.click(document.body);
    });
    let invalidErrorMessage = getByRole("alert");
    expect(invalidErrorMessage).toHaveTextContent(/Invalid Email Address/i);

    await waitFor(() => {
      userEvent.clear(email);
      userEvent.click(document.body);
    });
    invalidErrorMessage = getByRole("alert");
    expect(invalidErrorMessage).toHaveTextContent(/Email is required/i);

    await waitFor(() => {
      userEvent.type(email, "validemail@gmail.com");
      userEvent.click(submitBtn);
    });
    invalidErrorMessage = getByRole("alert");
    expect(invalidErrorMessage).toHaveTextContent(/Password is required/i);

    await waitFor(() => {
      userEvent.type(password, "1234567");
      userEvent.click(submitBtn);
    });
    invalidErrorMessage = getByRole("alert");
    expect(invalidErrorMessage).toHaveTextContent(
      /Password must be more than 8 characters./i
    );
  });

  it("should submit mutation with form values", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");

    const validFormData = {
      email: "validemail@naver.com",
      password: "testtest", // DB로 실제로 가지는 않음. form validation 통과할 데이터.
      role: UserRole.Client,
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedMutationResponse
    );
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, validFormData.email);
      userEvent.type(password, validFormData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      createAccountInput: { ...validFormData },
    });
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      "Your Account is Created! Log in now!"
    );
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should return error when mutation failed", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");

    const validFormData = {
      email: "validemail@naver.com",
      password: "testtest", // DB로 실제로 가지는 않음. form validation 통과할 데이터.
      role: UserRole.Client,
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: false,
          error: "mutation-failed",
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedMutationResponse
    );
    await waitFor(() => {
      userEvent.type(email, validFormData.email);
      userEvent.type(password, validFormData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      createAccountInput: { ...validFormData },
    });
    expect(window.alert).toHaveBeenCalledTimes(0);
    const validationError = getByRole("alert");
    expect(validationError).toHaveTextContent("mutation-failed");
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
