/*
  render(<컴포넌트 prop={true} />)
  rerender(<컴포넌트 prop={false} />)
  : state 값의 변화에 따른 실시간 rerendering 과정 구현.

  최초로 render에서 꺼내온 getByText & debug 그대로 활용.
*/
// [src/components/form-btn.tsx]
import React from "react";

interface IFormButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string; // 로딩중이지 않을 때 보여줄 버튼 문구.
}

export const FormButton: React.FC<IFormButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`py-4 text-xl focus:outline-none text-white transition-colors rounded-lg ${
      canClick
        ? "bg-lime-500 hover:bg-lime-600"
        : "pointer-events-none bg-gray-300"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
// ==============================================================================================
// [src/components/__tests__/form-btn.tsx]
import { render } from "@testing-library/react";
import React from "react";
import { FormButton } from "../form-btn";

describe("FormButton", () => {
  it("should render OK with props", () => {
    const { getByText, debug, rerender } = render(
      <FormButton canClick={true} loading={false} actionText="I am a Button" />
    );
    getByText("I am a Button");
    debug();
    rerender(
      <FormButton canClick={false} loading={true} actionText="I am a Button" />
    );
    getByText("Loading...");
    debug();
  });
});

// ==============================================================================================
