/*
  Helmet 사용하는 컴포넌트 테스트하는 경우
  1) HelmetProvider로 감싸서 rendering 필요.
  2) title 태그 내용 테스트할려면 await waitFor 필요. 조금 기다려줘야 Helmet이 값 변경.
*/
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NotFound } from "../404";
import { HelmetProvider } from "react-helmet-async";

describe("NotFound", () => {
  it("renders 404", async () => {
    const { getByText } = render(
      <HelmetProvider>
        <Router>
          <NotFound />
        </Router>
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Not Found | Uber Eats");
    });
  });
});

// ==============================================================
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Not Found | Uber Eats</title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
    <h4 className="font-medium text-base mb-5">
      The page you are looking for does not exist or has moved.
    </h4>
    <Link to="/" className="hover:underline font-semibold text-lime-600">
      Go back home &rarr;
    </Link>
  </div>
);

// ==============================================================
