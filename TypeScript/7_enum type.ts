/*
  enum : enumerable 열거가능.
*/
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
// Direction.Up = 0
// Direction.Down = 1
// Direction.Left = 2
// Direction.Right = 3

// ===================================================
/*
  enum 타입 활용하여 엔티티 수정
  - role 필드에 3가지 값들만 들어올 수 있도록 제한을 두는 방법
  - Client, Owner, Delivery. 문자열이 아니라 그 자체로 하나의 타입으로 사용.
  - DB에는 0, 1, 2라는 값으로만 전달되지만 수정 가능. 

  주의: class validation으로 @IsEnum(enum타입) 설정 필요.
*/
// [user.entity.ts]
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

enum UserRole {
  Client,
  Owner,
  Delivery, // TypeORM용 필드타입. DB에는 각각 0, 1 ,2라는 값으로 대입됨.
} // Client, Owner, Delivery. 문자열이 아니라 그 자체로 하나의 타입으로 사용.

registerEnumType(UserRole, { name: 'UserRole' }); // GraphQL용 필드타입. Client, Owner, Delivery 그대로 사용됨.

@InputType({ isAbstract: true }) // GraphQL 스키마에서 @InputType는 제외시키는 기능.
@ObjectType() // GraphQL 스키마에 @ObjectType만 생성. (동일명 스키마 중복 생성 금지)
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  // ~~
  @Field((type) => UserRole) // GraphQL
  @Column({ type: 'enum', enum: UserRole }) // TypeORM => 0, 1, 2 대입
  @IsEnum(UserRole)
  role: UserRole; // Client, Owner, Delivery
}

// =======================================================
// http://localhost:3000/graphql
mutation {
  createAccount(input: {
    email:"asdsdf", 
    password:"asd", 
    role: Client
  }){
    ok,
    error
  }
}