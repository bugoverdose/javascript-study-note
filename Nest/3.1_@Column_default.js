/*
  @Column({ default: 디폴트값 }) // TypeORM: DB에 대입될 기본값.   
  - 별도의 작업이 없으면 자동으로 DB에 디폴트값이 대입됨.
*/
// [user.entity.ts]
@InputType({ isAbstract: true })
@ObjectType()
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  // ~~
  @Field((type) => Boolean) // GraphQL
  @Column({ default: false }) // TypeORM: DB에 기본값으로 false 설정.
  emailVerified: boolean;
}
// ====================================================================
