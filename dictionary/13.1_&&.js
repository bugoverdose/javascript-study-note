/*
  Logical AND operator (&&)
  - 결과적으로 두 조건이 모두 참일 때만 true 반환. 
  - 세부 메커니즘: 두 값 중 하나를 반환.

  expr1 && expr2
  - expr1이 거짓이면 expr1을 반환. => false
  - expr1이 참이면 expr2를 반환. => expr2도 참이면 true. expr2가 거짓이면 false.
*/
a1 = true && true; // t && t returns true     (전자)
a2 = true && false; // t && f returns false   (후자)
a3 = false && true; // f && t returns false   (전자)
a4 = false && 3 == 4; // f && f returns false (후자)
a5 = "Cat" && "Dog"; // t && t returns "Dog"  (후자)
a6 = false && "Cat"; // f && t returns false  (전자)
a7 = "Cat" && false; // t && f returns false  (후자)
a8 = "" && false; // f && f returns ""        (전자)
a9 = false && ""; // f && f returns false     (전자)

// =============================================================
// 선 &&, 후 ||
T = true || (false && false); // returns true, because && is executed first
F = (true || false) && false; // returns false, because operator precedence cannot apply
