/*
  다른 라이브러리의 hook을 mock하는 방법.
  방법1) jest.mock : react-router-dom 라이브러리의 내용 자체를 다른 것으로 대체.
                   : 사용되는 모든 메서드들 전부 다 지정해줘야 함.

  방법2) jest.mock & jest.requireActual 
         : 실제 라이브러리를 그대로 사용하되 일부 메서드만 다른 것으로 덮어쓰기.
         : 권장. afterAll(()=>{jest.clearAllMocks()})로 mock 해제해주기.
*/
import { useHistory } from "react-router-dom";
const history = useHistory();
history.push("/");

// =====================================================================
// 방법 1) react-router-dom 라이브러리의 모든 내용을 다른 것으로 대체.
jest.mock("react-router-dom", () => {
  return {
    useHistory: () => {
      return {
        push: jest.fn(), // history.push("/") 대체
      };
    },
  };
});

// =====================================================================
// 방법 2) 실제 모듈 사용하되 일부분만 덮어쓰기.
const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});
// ~~
expect(mockPush).toHaveBeenCalledTimes(1);
expect(mockPush).toHaveBeenCalledWith("/");
// ~~~
afterAll(() => {
  jest.clearAllMocks();
});

// =====================================================================
