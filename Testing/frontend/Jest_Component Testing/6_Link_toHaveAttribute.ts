/*
  컴포넌트에 Link 존재하는 경우, 테스트할 때도 Router로 감싸서 render 필요

  container로 접근하고 toHaveAttribute를 통해 href속성에 대입된 값 확인 가능.

  expect(container.firstChild).toHaveAttribute("href", "/restaurant/12345");
  // <a href="/restaurant/12345"></a>
*/
import { BrowserRouter as Router } from "react-router-dom";

describe("Restaurant", () => {
  it("renders OK with props", () => {
    const { getByText, debug, container } = render(
      <Router>
        <Restaurant
          id={12345}
          restaurantName="food house"
          coverImg="url"
          categoryName="category can be undefined?"
        />
      </Router>
    );
    getByText("food house");
    getByText("category can be undefined?");
    expect(container.firstChild).toHaveAttribute("href", "/restaurant/12345"); // <a href="/restaurant/12345"></a>
  });
});
