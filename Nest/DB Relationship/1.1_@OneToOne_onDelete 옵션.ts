/*
  @OneToOne - 기본적으로 1:1로 연결된 데이터는 다른쪽 존재시, 양쪽 다 삭제 불가.

  { onDelete: 'CASCADE' }) 옵션
  : 반대쪽 User 데이터 삭제시 연결된 Verification 데이터도 따라서 자동 삭제되도록.
  : 반대쪽 User 데이터 존재시, 연결된 verification 데이터는 언제든 삭제 가능. 
    => 각 User는 0~1개의 Verification 데이터와 연결 가능.
    => 각 Verification 데이터는 1개의 User 데이터와 연결되어 있어야 함. (여전히)

  { onDelete: 'SET NULL' }) 옵션
  : 반대쪽 User 데이터 삭제시, 연결된 Verification 데이터의 user 칼럼에는 null 값 대입.
  : 원래는 user 칼럼에 연결된 UserEntity 정보 객체 그대로 존재.
    => 이쪽: 각 Verification 데이터는 0~1개의 User 데이터와 연결되어 있어야 함.
    => 반대쪽: 각 User는 1개의 Verification 데이터와 연결되어 있어야 함. (여전히. 아마도?)
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
  @OneToOne((type) => UserEntity, { onDelete: "CASCADE" }) // 연결된 User 데이터 삭제되면 연결된 Verification도 따라서 삭제됨. (기본적으로 연결됐으면 양쪽 다 삭제 불가.)
  user: UserEntity; // TypeORM으로 Verification에서 연결된 User 데이터에 접근하려면 메서드에 별도의 옵션 필요. (relations 등)

  @BeforeInsert() // Repo로 DB에 새로운 데이터 저장되기 전에 실행되는 hook.
  createCode(): void {
    this.code = uuidv4(); // 생성되려는 데이터의 code 컬럼에 해당 값 자동 대입.
  }
}
