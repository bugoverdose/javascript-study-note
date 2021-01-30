/*
  react-router-dom의 <Redirection />
  - 전반적인 route protection
   
  <Redirect from="*" to="/" />
  - 위쪽의 Route들 이외의 route로 접근 시도시, "/"로 redirect

  <>
   <Route exact path="/"><Auth /></Route>
   <Redirect from="*" to="/" />    // "/" 이외의 route에 접근 시도시 "/"로 redirect
  </>
*/
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
