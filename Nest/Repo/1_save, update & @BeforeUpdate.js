/*
  계정을 생성할 때 + 비밀번호를 변경할 때 모두 비번 hashing 필요.
  - UserEntity에 데코레이터 설정으로 해결 가능.
    - @BeforeInsert(): 새로운 UserEntity를 DB에 저장하기 직전에 해슁 함수 실행.
    - @BeforeUpdate(): DB의 UserEntity를 수정하기 직전에 해슁 함수 실행.
                     : DB에서 특정 entity를 확인하고 직접 수정할 때만 호출됨.
                     : Repo.update 메서드는 호출X. / Repo.save 메서드는 호출O. 

  typeOrm 디자인에 따라 @BeforeUpdate()가 호출되지 않을 수 있음.
  - Repo.update 메서드: DB에 특정 entity가 존재할 것을 가정하고 즉시 query를 보낼 뿐.
                      : 실제로 DB에서 특정 entity를 찾고 업데이트하는 것은 아님.
  - Repo.save 메서드: 주어진 entity가 DB에 존재하는지를 확인하고 '저장'. 
                    : DB에 해당 entity가 존재하는 경우 업데이트. updates
                    : DB에 해당 entity가 존재하지 않는 경우 새롭게 생성. inserts

  cf) save 메서드는 js 코드로 직접 데이터를 수정한 다음에 DB에 해당 데이터를 저장.
*/
// [user.entity.ts]
import { BeforeInsert, BeforeUpdate, Entity } from 'typeorm';

@InputType({ isAbstract: true }) // GraphQL 스키마에서 @InputType는 제외시키는 기능.
@ObjectType() // GraphQL 스키마에 @ObjectType만 생성. (동일명 스키마 중복 생성 금지)
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  // ~~

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10); // 인자1: 해슁할 데이터 / 인자2: saltOrRounds. 몇회.
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
// =============================================================
// [users.service.ts] save => @BeforeUpdate() 호출O
@Injectable()
export class UsersService {
  // ~~

  async editProfile(
    userId: number,
    { email, password }: EditProfileInputDto,
  ): Promise<UserEntity> {
    // userId: @AuthUser를 통해 쿠키의 토큰 정보가 담김. 로그인된 계정의 id.
    const currentUser = await this.usersRepo.findOne(userId); // DB에서 해당 토큰의 id에 해당하는 entity 찾기.
    if (email) {
      currentUser.email = email;
    }
    if (password) {
      currentUser.password = password;
    } // DB에서 찾아온 사용자 엔티티(currentUser)의 데이터 직접 수정.
    return this.usersRepo.save(currentUser); // 데이터 수정된 사용자 entity를 다시 DB에 저장.
  }
}
// =============================================================
// [users.service.ts] update => @BeforeUpdate() 호출X
@Injectable()
export class UsersService {
  // ~~

  async editProfile(userId: number, editProfileInput: EditProfileInputDto) {
    // userId: @AuthUser를 통해 쿠키의 토큰 정보가 담김. 로그인된 계정의 id.
    return this.usersRepo.update(userId, { ...editProfileInput }); // update: DB에 특정 엔티티의 내용 수정. fast. 주의: 해당 entity가 DB에 존재하는지 확인하지는 않음
    // 인자1. criteria: DB에서 수정 대상의 데이터 찾는 기준.
    // 인자2. 수정할 데이터. 사용자가 입력한 데이터만으로 구성된 객체. { ...editProfileInput }
  }
}

// =============================================================
// =============================================================
mutation{
  editProfile(input:{
    password: "updatedPassword3"
  }){
    ok,
    error
  }
}
{
  "data": {
    "editProfile": {
      "ok": true,
      "error": null
    }
  }
}
// =============================================================
query{
  loggedInUser{
    id,
    email,
    password
  }
}
// save 메서드 사용시 password에 hashing 결과가 대입됨.
{
  "data": {
    "loggedInUser": {
      "id": 4,
      "email": "updatedEmail@naver.com",
      "password": "$2b$10$W4BZqIRlAP4Nbm736hynU.3AhGJGkHcQkckIWat/ycq8xB.s/bELK"
    }
  }
}
// =============================================================
mutation {
  login(input: {
    email:"updatedEmail@naver.com", 
    password:"updatedPassword3",  
  }){
    ok,
    error,
    token
  }
}
{
  "data": {
    "login": {
      "ok": true,
      "error": null,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjEzNDgwMzkwfQ.JqXY7DIavBzQb_VSucW-6aOu9ebVwlJaV7BnYDdJ2GI"
    }
  }
}