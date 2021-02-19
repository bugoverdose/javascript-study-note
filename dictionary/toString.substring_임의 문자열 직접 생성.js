/*
  toString의 인자에 따라 다양한 형식 가능.
  - 36: 문자열
  - 10: 10진법
  - 2: 2진법 
  
  주의: 개발 도중 테스트 목적으로만 활용.
      : uniqueness & randomness를 원하면 uuid가 더 확실. 
*/
Math.random().toString(36).substring(2);
// "u4lwrbw0t8"

Math.random().toString(10).substring(2);
// "2631345872386983"

Math.random().toString(2).substring(2);
// "0101001010000110100100111000111111001000111000101101"
