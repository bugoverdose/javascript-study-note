/*
1) App : 조건에 따라 다른 Router 선택. local state의 값 등. (router protection 목적)
2) 각 Router : <Router><Switch> {조건에 따라 다른 <Route> 선택되도록} </Switch></Router>

          - <Header />            // 모든 Route들에 적용되도록 Switch 위에 적용       
  Router1 - Switch - Route - 각 path별 컴포넌트
                   - Route - 404 컴포넌트  // 다른 Route들에 해당되지 않는 path에 대해 
                      
  Router2 - Switch - Route     
                   - Redirect  // 다른 Route들에 해당되지 않는 path에 대해 

Route
- path : URL에 관한 prop
  - "/:id"처럼 URL에 변수 적용 가능.
- exact={true} : 라우트가 path와 완전히 일치할 때만 렌더링되도록.
- component : 렌더링할 페이지에 대한 prop

npm i react-router-dom 
<></> : fragments. 부모 element가 없는 복수의 element들을 렌더링하는 방법.
*/
// [App.tsx]
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar); // gql문 없이 해당 local only field에 직접 접근 + 업데이트되면 re-render되는 Hook.
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;

// ==========================================================
// [routers/logged-in-router.tsx]
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category:slug">
    <CategoryPage />
  </Route>,
];

export const LoggedInRouter = () => (
  <Router>
    <Header />
    <Switch>
      {data.loggedInUser.role === "Client" && ClientRoutes}
      <Redirect to="/" />
    </Switch>
  </Router>
);
// ===================================================
// [routers/client/restaurants.tsx]
import React from "react";

export const Restaurants = () => <h1>Restaurants Page</h1>;

// ==========================================================
// ==========================================================
// [routers/logged-out-router.tsx]
export const LoggedOutRouter = () => (
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
// Switch : 한번에 한개의 Route만 render해주는 기능
// exact 필수. ex) path="/"는 /를 포함하는 모든 경로를 의미. /~~~
// 순서 중요: 404 목적의 Route를 path 없이 맨 마지막에 설정. 어떤 경로에도 걸리지 않으면 NotFound Route로 가도록.

// ==========================================================
// [routers/404.tsx]
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

// ==========================================================
