/*
  getByRole("role") : 특정 role에 해당하는 html element 선택.
  toHaveTextContent로 내부 텍스트 검증.

  중요: role prop에 "role"을 설정해줘야 함.
        적용 가능한 role의 종류는 정해져 있음. not 자유 지정.

  cf) <button>의 경우 role="button"이 디폴트로 적용됨 => getByRole("button")처럼 선택 가능.
       const submitBtn = getByRole("button");
*/
export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span role="alert" className="font-semibold text-red-500">
    {errorMessage}
  </span>
);

// ==================================================================
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
  });
});

// ==================================================================
