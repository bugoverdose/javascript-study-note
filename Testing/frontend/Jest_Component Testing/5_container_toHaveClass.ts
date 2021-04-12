/*
  container : render되는 element. 바닐라JS처럼 내부 요소 접근 가능.

  expect(container.firstChild).toHaveClass("pointer-events-none");
  - 해당 element가 특정 class명을 지니는지 확인 용이.
*/
import { render } from "@testing-library/react";
import React from "react";
import { FormButton } from "../form-btn";

describe("FormButton", () => {
  it("should render OK with props", () => {
    const { getByText, rerender, container } = render(
      <FormButton canClick={true} loading={false} actionText="I am a Button" />
    );
    getByText("I am a Button");
    expect(container.firstChild).toHaveClass("bg-lime-500 hover:bg-lime-600");

    rerender(
      <FormButton canClick={false} loading={true} actionText="I am a Button" />
    );
    getByText("Loading...");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
