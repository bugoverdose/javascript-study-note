/*
  client.writeFragment({id, fragment})
  - id : 수정할 캐쉬의 id. '타입:id' 형식.
  - fragment : 수정하고 싶은 type의 일부분. gql문으로 선택.

  해당 타입의 데이터들 중 id에 해당하는 데이터를 하나를 cache에서 찾고,
  선택된 데이터의 일부분(fragment)을 수정하여 cache에 저장.

  F12 > Apollo > Cache
  - 타입:id 
  - User:1 - DB에서 오는 타입은 User. id는 'User:1'
  - UserEntity:2 - UserEntity 타입. id는 'UserEntity:2'

  https://www.apollographql.com/docs/react/caching/cache-interaction/
*/
const LOGGED_IN_USER_QUERY = gql`
  query loggedInUserQuery {
    loggedInUser {
      id
      email
      role
      emailVerified
    }
  }
`; // 중요: id 필드가 있어야 writeFragment로 접근하여 수정 가능

// 해당 Query 실행시, cache에 UserEntity 값 담기게 됨.
/* 
UserEntity:2                 // 해당 캐쉬의 id.  // UserEntity는 데이터 타입. 
 email: "test1@naver.com"
 emailVerified: false        // 수정가능한 필드값
 id: 2                       // DB 기준의 id => 캐쉬id 생성에 활용되므로 필요.
 role: "Client" */

// ======================================================================
const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInputDto!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useLoggedInUser(); // UserEntity:2 현재 로그인된 사용자의 캐쉬 데이터.
  const client = useApolloClient();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok }, // verifyEmail Mutation의 실행결과. { ok, error }
    } = data;
    if (ok && userData?.loggedInUser.id) {
      client.writeFragment({
        id: `UserEntity:${userData.loggedInUser.id}`, // 캐쉬id: UserEntity:2
        fragment: gql`
          fragment VerifiedUser on UserEntity {
            emailVerified
          }
        `, // fragment의 타입은 UserEntity. (F12 > Apollo > Cache 참고).
        data: {
          emailVerified: true,
        }, // UserEntity.emailVerified 필드의 값을 선택하여 값 수정.
      });
    }
  };

  const [verifyEmail] = useMutation<
    verifyEmail, // outputDTO
    verifyEmailVariables // inputDTO
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted, // 2) FrontEnd 쪽의 cache도 변하도록 직접 지정. DB로 변화된 데이터 재요청X.
  }); // 1) Mutation 실행하여 ok:true 되면 DB 변화.

  export const useLocationParam = (string: string) => {
    return new URLSearchParams(useLocation().search).get(string);
  };
  const code = useLocationParam("code"); // /confirm?code=~~~

  useEffect(() => {
    if (code) {
      verifyEmail({
        variables: {
          input: { code: code },
        },
      });
    }
  }, []); // 최초로 1번만 effect함수가 실행되도록.
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className=  );
};

// ======================================================================
