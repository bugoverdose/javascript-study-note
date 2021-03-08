/*
  Header 컴포넌트의 경우 모든 Route들에 적용되도록 Switch 위에 적용.
  - Switch는 하나의 Route만 렌더링해줌.       

  Header에 Link들 설치하려면 <Router> 내부에 설정 필요.
  - Link는 Router 내부에 존재해야 사용 가능함.
*/
// logged-in-router.tsx
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  // 최우선: 로그인된 상태면 해당 Router에서 loggedInUser query를 통해 사용자 정보 얻기.
  const { data, loading, error } = useLoggedInUser();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-semibold text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.loggedInUser.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

// ===================================================================
// [header.tsx]
export const Header: React.FC = () => {
  const { data } = useLoggedInUser(); // 이미 cache에 존재하는 경우 재요청X. query의 실행 결과 그대로 활용.
  return (
    <header className="py-4">
      <div className="px-5 xl:px-0 w-full max-w-screen-lg mx-auto flex justify-between items-center">
        <LogoImg css="w-24" />
        <Link to="/users/my-profile">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </Link>
      </div>
    </header>
  );
};
