/*
  [DTO 생성 방법들 핵심]
  1) Entity를 상속하여 MappedTypes로 DTO 생성: @InputType
     : 상속하는 GraphQL entity & 상속받는 dto 양쪽에 @InputType() 필요. 
     : Resolver에서는 @Args('input')처럼 매개변수명 지정 필요.

  2) 다른 DTO를 상속하여 DTO 생성: @ObjectType
     : 상속하는 dto & 상속받는 dto 양쪽에 @ObjectType() 필요.
     : common 모듈에 CoreOutputDto 생성 후 상속받기. (코드 중복 최소화) 
*/
// [verify-email.dto.ts]
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/common/dtos/output.dto';
import { VerificationEntity } from '../entities/verificaton.entity';

@InputType() // Entity를 MappedTypes로 상속하여 DTO 생성하기 위해 양쪽에 필요.
export class VerifyEmailInput extends PickType(VerificationEntity, ['code']) {}

@ObjectType() // DTO를 상속하여 DTO 생성하기 위해 양쪽에 필요.
export class VerifyEmailOutputDto extends CoreOutputDto {}
// ================================================================
// [users.resolver.ts]
@Mutation((returns) => VerifyEmailOutputDto)
verifyEmail(@Args('input') verifyEmailInput: VerifyEmailInputDto) {~~~}
// ================================================================
// [verification.entity.ts]
@InputType({ isAbstract: true }) // MappedTypes를 통해 해당 GraphQL 엔티티로 dto 생성하기 위해 필요. isAbstract: GraphQL 스키마에서는 @InputType는 제외.
@ObjectType() // 클래스를 GraphQL 엔티티로 설정. GraphQL 스키마에 @ObjectType만 생성. (동일명 스키마 중복 생성 금지)
@Entity() // TypeORM
export class VerificationEntity extends CoreEntity { 
  @Column() // TypeORM
  @Field((type) => String) // GraphQL
  code: string;

  @JoinColumn() // VerificationEntity 쪽에 관계 id 생성. UserEntity에 접근 가능.
  @OneToOne((type) => UserEntity)
  user: UserEntity;
  // ~~
}
// ================================================================
// [common/dtos/output.dto.ts]
import { Field, ObjectType } from '@nestjs/graphql';
 
@ObjectType()
export class CoreOutputDto {
  @Field((type) => String, { nullable: true })
  error?: string; // error는 값이 undefined일 수 있기 때문에 선택사항. TS 기능.

  @Field((type) => Boolean)
  ok: boolean; // 에러떠도 ok의 값은 true/false로 존재.
}

// ================================================================
// ================================================================
// => [create-account.dto.ts]
@ObjectType()
export class CreateAccountOutputDto extends CoreOutputDto {}

// ================================================================
// => [login.dto.ts]
@ObjectType()
export class LoginOutpuDto extends CoreOutputDto {
  @Field((type) => String)
  token: string;
}

// ================================================================
// => [user-profile.dto.ts]
@ObjectType()
export class UserProfileOutputDto extends CoreOutputDto {
  @Field((type) => UserEntity)
  user: UserEntity;
}

// ================================================================