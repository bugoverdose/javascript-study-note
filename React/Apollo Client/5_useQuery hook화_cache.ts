/*
  컴포넌트 사이에 prop으로 query 실행 결과를 전달하는 것에 비해, 
  모든 컴포넌트에 hook을 설정해놓으면 성능 저하X. 코드 중복만 감소.

 const { data, loading, error } = useQuery<output타입들>(gql문);
 => 해당 작업을 hook으로 만들어서 다양한 곳에서 재활용.

 장점: 해당 query의 실행 결과가 cache에 이미 존재하는 경우 재요청X.
       => 즉, 같은 route에서 여러 컴포넌트에서 해당 hook을 활용하더라도,
          해당 query는 단 한번만 요청됨.
*/
// [hooks/useLoggedInUser-hook.tsx]
import { gql, useQuery } from "@apollo/client";
import { loggedInUserQuery } from "../generated_api_types/loggedInUserQuery";

const LOGGED_IN_USER_QUERY = gql`
  query loggedInUserQuery {
    loggedInUser {
      id
      email
      role
      emailVerified
    }
  }
`;

export const useLoggedInUser = () =>
  useQuery<loggedInUserQuery>(LOGGED_IN_USER_QUERY);

// ======================================================================
// [logged-in-router.tsx]
export const LoggedInRouter = () => {
  // 최우선: 로그인된 상태면 해당 Router에서 loggedInUser query를 통해 사용자 정보 얻기.
  const { data, loading, error } = useLoggedInUser();
  console.log(data, loading, error);
  return <Router><Header /></Router>;
};

// ======================================================================
// [header.tsx]
export const Header: React.FC = () => {
  const { data } = useLoggedInUser(); // 이미 cache에 존재하는 경우 재요청X. query의 실행 결과 그대로 활용.
  // data?.loggedInUser.email  // data가 없는 경우 유의. optional chaining
  return (
    // <header className="py-4">
    //   <div className="w-full max-w-screen-lg mx-auto flex justify-between items-center">
    //     <LogoImg css="w-24" />
    //     <span>{data?.loggedInUser.email}</span>
    //   </div>
    // </header>
  );
};
