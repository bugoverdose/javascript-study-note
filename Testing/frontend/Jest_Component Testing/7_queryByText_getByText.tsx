/*
  getByText("text") : 특정 텍스트가 존재하지 않으면 그대로 테스트 fail.
  queryByText("text") : 특정 텍스트가 존재하지 않으면 null 값 반환
                      : 특정 텍스트가 존재하지 않음을 테스트하기 위해 활용.
  - 둘 다 해당 텍스트 존재시 테스트 그대로 통과.
*/
const { getByText, queryByText } = render(<컴포넌트 />);

// 해당 텍스트가 존재하지 않을 것이다.
expect(queryByText("Please verify your email.")).toBe(null);

// 해당 텍스트가 존재할 것이다.
getByText("Please verify your email.");
queryByText("Please verify your email."); // 동일 결과
