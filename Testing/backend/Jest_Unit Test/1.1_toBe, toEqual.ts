// toBe : 정확한 내용 입력. 인자와 완전히 일치하는 데이터인지 확인.
// toEqual : toBe의 기능 + type 등 확인 가능. toEqual(expect.any(String)) 등

// [users.e2e-spec.ts]
expect(res.body.data.createAccount.error).toBe(null); // 가능

expect(res.body.data.createAccount.error).toBe("Failed to create an account."); // 가능
expect(res.body.data.createAccount.error).toEqual(
  "Failed to create an account."
); // 가능

expect(res.body.data.createAccount.error).toEqual(expect.any(String)); // 가능
expect(res.body.data.createAccount.error).toBe(expect.any(String)); // 에러!!
// Expected: Any<String>
