/*
<Router><Switch> {조건에 따라 다른 <Route> 선택되도록} </Switch></Router>

npm i react-router-dom 
<></> : fragments. 부모 element가 없는 복수의 element들을 렌더링하는 방법.
*/
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../src/routes/Auth";
import Home from "../src/routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // true로 바꿔보면서 확인 가능.
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
