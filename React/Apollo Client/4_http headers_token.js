/*  
  LoggedInRouter
  1) Http header에 토큰 추가. ApolloClient의 link 설정.
     - 각 useQuery에 매번 http header를 설정하는 것도 가능. 하지만 번거로움. 코드 중복. 
  2) localstorage에 token이 저장된 경우에 자동으로 LoggedInRouter로 접근.
     - isLoggedInVar 기준. token 존재시 참.
  3) 최우선으로 로그인된 상태면 loggedInUser query를 통해 사용자 정보 얻기.
    - useQuery
*/
// [apollo.ts]
import { setContext } from "@apollo/client/link/context";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token)); // reactive variable 생성. 토큰이 없으면 디폴트 값은 false.
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers, // 기존에 존재하는 다른 http headers도 그대로 사용하도록.
      "x-jwt": token || "", // x-jwt key로 header 설정.
      // 주의. token이 없는 경우에 대비 필요.
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // concat을 통해 복수의 link들을 설정.
  cache: new InMemoryCache({
    /*~*/
  }),
});

// ===========================================================
// [App.tsx]
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar); // gql문 없이 해당 local only field에 직접 접근 + 업데이트되면 re-render되는 Hook.
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

// ===========================================================
// [login.tsx]

// 최우선: 로그인된 상태면 해당 Router에서 loggedInUser query를 통해 사용자 정보 얻기.
const LOGGED_IN_USER_QUERY = gql`
  query loggedInUserQuery {
    loggedInUser {
      id
      email
      role
      emailVerified
    }
  }
`; // 주의 : http headers의 token 필요.

export const LoggedInRouter = () => {
  const { data, loading, error } =
    useQuery < loggedInUserQuery > LOGGED_IN_USER_QUERY;
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-semibold text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <span className="font-semibold text-xl tracking-wide">
      You are Logged In! {data.loggedInUser.role}
    </span>
  );
};
