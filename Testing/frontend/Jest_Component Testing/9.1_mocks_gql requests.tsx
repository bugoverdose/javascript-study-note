/*
  mocks : query, mutation의 요청 결과를 mock하는 기능. 얕은 테스트만 가능.
  - useQuery를 활용한 useLoggedInUser hook의 결과를 mock하지 말고, useQuery의 결과 자체를 mock.
  - useQuery에서 사용하는 gql문을 그대로 활용. (export 필요)

  중요 1) waitFor로 전부 감싸줘야 함. state 값이 변화하므로 rerender되므로.
       2) await new Promise((resolve) => setTimeout(resolve, 0)); 
          // query 요청+결과가 진행되도록 기다려줘야 함.
*/
// MockedProvider - mocks 사용 형식 주의.
import { MockedProvider } from "@apollo/client/testing";
describe("Header", () => {
  it("renders OK with props", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: LOGGED_IN_USER_QUERY, // useQuery에 인자로 대입한 gql문 그대로 활용.
              },
              result: {
                data: {
                  loggedInUser: {
                    id: 1,
                    email: "test1@naver.com",
                    role: "Client",
                    emailVerified: true,
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
    });
  });
});

// =============================================================================
// useLoggedInUser-hook.tsx
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

// =============================================================================
export const Header: React.FC = () => {
  const { data } = useLoggedInUser(); // 이미 cache에 존재하는 경우 재요청X. query의 실행 결과 그대로 활용.
  return (
    <>
      {!      )}
      <header className="py-4">
        <div className="capsule-container-width flex justify-between items-center">
          <Link to="/">
            <LogoImg css="w-24" />
          </Link>
          <Link to="/edit-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </div>
      </header>
    </>
  );
};

// =============================================================================