/*
  TypeORM은 기본적으로 relationship 관련 데이터는 누락시킴. (성능 저하 예방)
  - findOne으로 찾아와진 데이터에는 관계를 맺은 다른 데이터들이 담기지 않음.
  => TyprORM에게 관련 relationship을 불러와달라고 요구 필요.
  
  { relations: ['user'] }  // verification의 user 칼럼. not Entity명.
  - verification의 user 칼럼 값 전체를 담아줌. 즉, 연결된 UserEntity 데이터 전체를 담아줌.
  - 즉, verification.user에 연결된 UserEntity 데이터 전체를 담아줌.

  { loadRelationIds: true } 
  - verification.user에 user.id 데이터만 담아줌.
  - 성능 저하 예방. 누구와 연결되었는지만 알면 될 때 필요.
  ==> 다만, 실제로는 @RelationId 활용하여 별개의 필드 생성하면 해당 옵션 불필요.
*/
// [verification.entity.ts]
export class VerificationEntity extends CoreEntity {
  // ~~
  @JoinColumn() // VerificationEntity 쪽에 관계 id 생성. UserEntity에 접근 가능.
  @OneToOne((type) => UserEntity)
  user: UserEntity; // TypeORM으로 데이터 찾아오는 경우, 별도의 옵션 필요.
}

// ======================================================
// [users.service.ts]
const verification = await this.verificationRepo.findOne({ code });
console.log(verification.user); // undefined

// ======================================================
const verification = await this.verificationRepo.findOne(
  { code },
  { loadRelationIds: true }
);
console.log(verification.user); // 5  // user.id 값만 대입됨.
console.log(verification);
/* VerificationEntity {
  id: 1,
  createdAt: 2021-02-18T10:58:14.709Z,
  updatedAt: 2021-02-18T10:58:14.709Z,
  code: 'a6ccb3c2-1a0b-4c30-bf32-07efd720ebdf',
  user: 5
} */

// ======================================================
const verification = await this.verificationRepo.findOne(
  { code },
  { relations: ["user"] }
);
console.log(verification.user);
/* UserEntity {
  id: 5,
  createdAt: 2021-02-18T10:58:14.647Z,
  updatedAt: 2021-02-18T10:58:14.647Z,
  email: 'test111@naver.com',
  password: '$2b$10$V8unPrt6LhOzzsAtRItIpOd8JRa.krfQPNsMcwMJ6uMSNjWVtM/qe',
  role: 2,
  emailVerified: false
} */
console.log(verification);
/* VerificationEntity {
  id: 1,
  createdAt: 2021-02-18T10:58:14.709Z,
  updatedAt: 2021-02-18T10:58:14.709Z,
  code: 'a6ccb3c2-1a0b-4c30-bf32-07efd720ebdf',
  user: UserEntity {
    id: 5,
    createdAt: 2021-02-18T10:58:14.647Z,
    updatedAt: 2021-02-18T10:58:14.647Z,
    email: 'test111@naver.com',
    password: '$2b$10$V8unPrt6LhOzzsAtRItIpOd8JRa.krfQPNsMcwMJ6uMSNjWVtM/qe',
    role: 2,
    emailVerified: false
  }
} */

// ======================================================
