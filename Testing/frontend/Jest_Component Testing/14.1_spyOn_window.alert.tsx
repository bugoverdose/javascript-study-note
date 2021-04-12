/*
  Error: Not implemented: window.alert
  - alert 메서드를 다른 방식으로 실행 필요. 
  
  spyOn.mockImplementation : 기존 implementation 방식을 변경. 다르게 실행되도록 대체.
*/
alert("Your Account is Created! Log in now!");

// ===============================================================================
// 테스트
jest.spyOn(window, "alert").mockImplementation(() => null);
expect(window.alert).toHaveBeenCalledWith(
  "Your Account is Created! Log in now!"
);

// ===============================================================================
