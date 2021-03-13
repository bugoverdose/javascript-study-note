/*
  Router - Switch 내부에 맨 마지막 Route 중 하나로 <Redirect /> 설정. 

  <Redirect from="/~" to="/~" />
  - to : 특정 route로 redirect
  - from : 특정 route에 접근했을 때만 redirect 실행. 
           생략하면 모든 잘못된 route에 대해 실행됨.
  - react-router-dom의 <Redirect />    
  - 전반적인 route protection 목적     
*/
// [routers/logged-in-router.tsx]
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  // ~~
  return (
    <Router>
      <Switch>
        {data.loggedInUser.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
// ==============================================================
