/*
  not null 제약조건: DB의 column에 null 보내면 안됨 => 에러.
  - update 대상 오류: 수정하지 않을 field에 undefined를 담아 보내면 에러 발생. 
  => 값을 입력한 column의 데이터만 update 대상에 포함시키기 => { ...dto }

  - { email, password }
    : email만 수정하는 경우, {email: 수정값, password: undefined}가 DB로 전해짐.

  - { ...editProfileInput }
    : email만 수정하는 경우, {email: 수정값}만 DB로 전해짐.
*/

// [users.service.ts] 정답
editProfile1 = (userId, editProfileInput) => {
  // userId: @AuthUser를 통해 쿠키의 토큰 정보가 담김. 로그인된 계정의 id.
  return this.usersRepo.update(userId, { ...editProfileInput }); // update: DB에 특정 엔티티의 내용 수정. fast. 주의: 해당 entity가 DB에 존재하는지 확인하지는 않음
  // 인자1. criteria: DB에서 수정 대상의 데이터 찾는 기준.
  // 인자2. 수정할 데이터. 사용자가 입력한 데이터만으로 구성된 객체. { ...editProfileInput }
};

// { ...editProfileInput }
// email만 수정하는 경우, {email: 수정값}만 DB로 전해짐.

// =============================================================
// [users.service.ts] Wrong : not null 제약조건 위배
editProfile2 = (userId, { email, password }) => {
  // userId: @AuthUser를 통해 쿠키의 토큰 정보가 담김. 로그인된 계정의 id.
  return this.usersRepo.update(userId, { email, password }); // update: DB에 특정 엔티티의 내용 수정. fast. 주의: 해당 entity가 DB에 존재하는지 확인하지는 않음
  // 인자1. criteria: DB에서 수정 대상의 데이터 찾는 기준.
  // 인자2. 수정할 데이터. 사용자가 입력한 { email, password } 데이터.
};

// { email, password }
// email만 수정하는 경우, {email: 수정값, password: undefined}가 DB로 전해짐.

// =============================================================
