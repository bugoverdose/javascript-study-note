/*
  userEvent : 사용자의 특정 행동에 따라 keydown, onchange 등 모든 이벤트들이 순차적으로 발생될 것이라고 가정.

  - userEvent.type(htmlElement, "입력 값") // 사용자가 특정 element에 실제로 텍스트를 입력했다고 가정.
  : 사용자가 특정 element에 실제로 텍스트를 입력했다고 가정. 
  - 사용자의 조작 과정 테스팅. 세부적인 과정 통제 가능.

  - userEvent.click(document.body); // 어딘가 화면 내부를 클릭했다고 가정.

  - userEvent.clear(email); // 해당 input의 입력 값을 전부 지웠다고 가정 

  clear / click / dblClick / selectOptions / deselectOptions / upload / type / tab / paste / hover / unhover
*/
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(<Login />);
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    await waitFor(() => {
      userEvent.type(email, "this@wontWork");
      userEvent.click(document.body); // onBlur 모드이므로 외부 클릭 과정 필요.
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Invalid Email Address/i);

    await waitFor(() => {
      userEvent.clear(email);
      userEvent.click(document.body);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required/i);
  });
});
