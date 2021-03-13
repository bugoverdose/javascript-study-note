/*
  Router - Switch - 마지막 Route 내부에 404 컴포넌트 설정.

  순서 중요: 404 목적의 Route를 path 없이 맨 마지막에 설정. 
  어떤 경로에도 해당하지 않으면 NotFound 컴포넌트가 render되도록.
*/
// [routers/logged-out-router.tsx]
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // HashRouter는 url에 #가 보이지만 배포하기는 더 쉬움.

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

// ==============================================================
// [routers/404.tsx]
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
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
