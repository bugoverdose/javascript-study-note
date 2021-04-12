/*
  window.location.reload = jest.fn(() => null);
  - TypeError: Cannot assign to read only property 'reload' of object '[object Location]'
  - 그 외 spyOn 등의 방법으로는 테스트 불가능.

  Object.defineProperty로 window 객체 내용 자체를 override 필요함.
*/
window.location.reload();

// ===============================================================================
// 테스트
Object.defineProperty(window, "location", {
  value: { reload: jest.fn(() => null) },
});

// ===============================================================================
