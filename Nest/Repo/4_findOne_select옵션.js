/*
 버그: Repo.save는 @BeforeUpdate 훅을 자동 호출.
 => hashPassword 메서드기 실행되면서 hash된 비밀번호를 다시 한번 hash하게 됨.
 
 방법1) Repo.update로 @BeforeUpdate 훅 회피.
 방법2) Repo.save + hashPassword 메서드 수정 + UserEntity의 password 칼럼 수정.
  - hashPassword: password 값이 인자에 존재하는 경우에만 hash하도록 수정.
  - UserEntity에서 password 칼럼에 {select:false} 옵션 추가.
 
 {select:false} 옵션
  => findOne 메서드로 데이터 가져올 때 password 칼럼은 자동으로 누락됨.
     => findOne 메서드로 password 데이터도 가져오고 싶은 경우 직접 select 필요해짐.
  => password 칼럼만 제외된 UserEntity 객체를 Repo.save 메서드에 전달 가능해짐.
     Repo.save에서 TypeORM은 password 인자가 없으면 데이터가 변경되지 않은 것으로 간주.

  ============================================================================
  select 옵션: 특정 UserEntity의 특정 칼럼 데이터들만 findOne으로 선택하여 가져오기.
      const user = await this.usersRepo.findOne(
        { email },
        { select: ['id', 'password'] }, 
      ); 
  - select 옵션 없으면 UserEntity의 모든 데이터 담김.
  - 특정 칼럼의 데이터들만 가져오기. UserEntity의 메서드들은 그대로 사용 가능.
  - { select: false } 옵션 적용된 password 칼럼 데이터를 선택하기 위해 필요해짐.
*/
// [user.entity.ts]
@InputType({ isAbstract: true }) // MappedTypes를 통해 해당 GraphQL 엔티티로 dto 생성하기 위해 필요. isAbstract: GraphQL 스키마에서는 @InputType는 제외.
@ObjectType() // GraphQL 스키마에 @ObjectType만 생성. (동일명 스키마 중복 생성 금지)
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  // ~~
  @Field((type) => String)
  @Column({ select: false }) // 해당 칼럼만 제외된 UserEntity 객체를 Repo.save 메서드에 전달 가능해짐.
  @IsString()
  password: string;

  @BeforeInsert() // UserEntity를 Repo.create => Repo.save시키기 전에 자동실행.
  @BeforeUpdate() // UserEntity를 Repo.save시킬 때 자동실행.
  async hashPassword(): Promise<void> {
    if (this.password) {
      // password 칼럼 데이터가 존재하는 경우에만 실행. @Column({ select: false }) => password 칼럼 제외된 UserEntity 존재 가능.
      try {
        this.password = await bcrypt.hash(this.password, 10); // 인자1: 해슁할 데이터 / 인자2: saltOrRounds. 몇회.
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }
}

// ===========================================================================
// [users.service.ts]
// verifyEmail 함수: findOne에서 password 칼럼은 누락 + save에 password 칼럼 없으니 변경되지 않음.
@Injectable()
export class UsersService {
  // ~~~
  async login({
    email,
    password,
  }: LoginInputDto): Promise<{ ok: boolean, error?: string, token?: string }> {
    try {
      // 1) find the user from the DB with the email
      const user = await this.usersRepo.findOne(
        { email },
        { select: ["id", "password"] } // 특정 칼럼의 데이터들만 가져오기. UserEntity의 메서드들은 그대로 사용 가능.
        // { select: false } 옵션 적용된 password 선택하기 위해 필요해짐.
      ); // select 옵션 없으면 UserEntity의 모든 데이터 담김.
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      // ~~~~~
    } catch (error) {}
  }
  // ~~
  async verifyEmail(code: string): Promise<boolean> {
    try {
      const verification = await this.verificationRepo.findOne(
        { code },
        { relations: ["user"] } // verification의 user 칼럼. not Entity명.
        // relations 옵션: verification.user 값 전체를 담아줌. 즉, 연결된 UserEntity 데이터 전체를 담아줌.
      ); // TypeORM은 기본적으로 relationship 관련 데이터는 누락시킴. (성능 저하 예방)
      if (verification) {
        verification.user.emailVerified = true; // 연결된 UserEntity의 복사본의 emailVerified 값 변경.
        this.usersRepo.save(verification.user); // 변형된 복사본 데이터를 저장.
        return true;
      }
      throw new Error();
    } catch (e) {
      return false;
    }
  }
}

// ===========================================================================
