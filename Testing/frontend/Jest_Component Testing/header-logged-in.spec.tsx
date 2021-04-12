import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { HeaderLoggedIn as Header } from "../header-logged-in";
import { BrowserRouter as Router } from "react-router-dom";
import { LOGGED_IN_USER_QUERY } from "../../hooks/useLoggedInUser-hook";
import { isLoggedInVar } from "../../apollo";
import userEvent from "@testing-library/user-event";
import { LOCALSTORAGE_TOKEN } from "../../constants";

describe("HeaderLoggedIn", () => {
  it("should render OK as Host", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: LOGGED_IN_USER_QUERY,
              },
              result: {
                data: {
                  loggedInUser: {
                    id: 1,
                    email: "test1@naver.com",
                    userName: "Peterson",
                    role: "Host",
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      await waitFor(() => {
        isLoggedInVar(true);
      });
      getByText("Podcast");
      getByText("Log Out");
      getByText("Upload");
    });
  });

  it("should render OK as Listener", async () => {
    await waitFor(async () => {
      const { getByText, queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: LOGGED_IN_USER_QUERY,
              },
              result: {
                data: {
                  loggedInUser: {
                    id: 1,
                    email: "test1@naver.com",
                    userName: "Peterson",
                    role: "Listener",
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText("Podcast");
      getByText("Log Out");
      expect(queryByText("Upload")).toBe(null);
    });
  });

  it("should be able to log out", async () => {
    await waitFor(async () => {
      const { getByText, queryByText, getAllByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: LOGGED_IN_USER_QUERY,
              },
              result: {
                data: {
                  loggedInUser: {
                    id: 1,
                    email: "test1@naver.com",
                    userName: "Peterson",
                    role: "Listener",
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));

      const [logoutBtn] = getAllByText("Log Out");
      jest.spyOn(Storage.prototype, "removeItem");

      Object.defineProperty(window, "location", {
        value: { reload: jest.fn(() => null) },
      });
      await waitFor(() => {
        userEvent.click(logoutBtn);
      });
      getByText("Podcast");
      expect(queryByText("Log Out")).toBe(null);
      expect(queryByText("Upload")).toBe(null);
      expect(localStorage.removeItem).toHaveBeenCalledWith(LOCALSTORAGE_TOKEN);
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });
});
