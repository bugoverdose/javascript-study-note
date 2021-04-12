/*
  getByPlaceholderText 
  : placeholder에 특정 값이 적용된 element의 존재 여부 확인. 없으면 테스트 실패.
  : 해당하는 html element를 선택하여 반환. 변수로 받아 userEvent.type 등으로 조작 가능.
  
  const email = getByPlaceholderText("Email") 
  1) placeholder="Email"인 태그의 존재 여부 확인
  2) email에 해당 html element 선택하여 대입.
  
  getByPlaceholderText(/email/i); 
  // case-insensitive. reg exp. Email, eMaiL 등 전부 인정.
*/
describe("Login", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(<Login />);
    });
  }); // beforeEach : 각각의 it 실행시 맨 처음에 재실행.

  it("displays email validation errors", async () => {
    const { getByPlaceholderText } = renderResult;
    getByPlaceholderText("Email");
    // placeholder="Email"인 태그의 존재 여부 확인.

    getByPlaceholderText(/email/i);
    // case-insensitive. reg exp. 대소문자 무관.
    // placeholder="Email", placeholder="eMaiL" 등 전부 인정.
  });
});
// =========================================================
