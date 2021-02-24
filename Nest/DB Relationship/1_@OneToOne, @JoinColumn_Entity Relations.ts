/*
  [one-to-one relations]
  : VerificationEntity는 하나의 UserEntity만 지닐 수 있고, (A contains only one instance of B.)
    UserEntity는 하나의 VerificationEntity만 지닐 수 있음. (B contains only one instance of A.)
  
  관계를 맺는 A와 B 엔티티들 중 한쪽에서 반대쪽 엔티티 값의 필드 생성(해당 데코레이터 2개 사용) 
  1) @OneToOne((type) => UserEntity) : 1대1 관계를 맺는 작업. 반대쪽 엔티티 반환 설정. 
  2) @JoinColumn(): 두 엔티티 간의 관계 id를 해당 엔티티 쪽에 생성시켜줌. 
  => UserEntity에서 사용자의 VerificationEntity에 접근하려면 UserEntity에 설정 필요. 
  => VerificationEntity에서 UserEntity에 접근하려면 VerificationEntity에 설정 필요. 

  - 관계가 맺어지는 상대편에는 별도의 작업 불필요.  
  - AppModule의 TypeOrmModule에 UserEntity & VerificationEntity 둘 다 설정 필수.
*/
// [verification.entity.ts]
@InputType({ isAbstract: true }) // MappedTypes를 통해 해당 GraphQL 엔티티로 dto 생성하기 위해 필요. isAbstract: GraphQL 스키마에서는 @InputType는 제외.
@ObjectType() // 클래스를 GraphQL 엔티티로 설정. GraphQL 스키마에 @ObjectType만 생성. (동일명 스키마 중복 생성 금지)
@Entity() // TypeORM
export class VerificationEntity extends CoreEntity {
  // id
  // createdAt
  // updatedAt // 자동으로 값 생성+대입해주는 특수 column들 사용함.

  @Column() // TypeORM
  @Field((type) => String) // GraphQL
  code: string;

  @JoinColumn() // VerificationEntity 쪽에 관계 id 생성. UserEntity에 접근 가능.
  @OneToOne((type) => UserEntity) // UserEntity와의 연결 생성 - UserEntity에는 설정 불필요.
  user: UserEntity; 
}
// =================================================================
// [app.module.ts]
@Module({
  imports: [
    ConfigModule.forRoot({~~}),
    TypeOrmModule.forRoot({
      // ~~
      entities: [UserEntity, VerificationEntity],
    }), 
    // ~~
  ],
  // ~~
})
export class AppModule implements NestModule { ~ }
// =================================================================