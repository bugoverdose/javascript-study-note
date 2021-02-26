/*
  CoreEntity
  GraphQL entity & TypeORM entity
  class-validator 
  @Column({ unique: true })  // TypeORM. 중복 불가. ex) DB에 하나의 이메일로 복수의 계정 생성 예방. 
  enum 타입
  DB 변화시 자동실행되는 메서드(hashPassword)
  해당 Entity로 생성된 repository에서 호출가능한 메서드
*/
// [core.entity.ts]
import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 상속받는 쪽에 @Entity, @InputType, @ObjectType 모두 존재.
@ObjectType() // 상속하는 쪽 & 상속받는 양쪽에 필수.
export class CoreEntity {
  @Field((type) => Number) // GraphQL
  @PrimaryGeneratedColumn() // TypeORM
  id: number;

  @Field((type) => Date) // GraphQL
  @CreateDateColumn() // TypeORM
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}

// =====================================================================
// =====================================================================
// [user.entity.ts]
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsString } from 'class-validator';

enum UserRole {
  Client,
  Owner,
  Delivery,
} // TypeORM용 필드타입. DB에는 각각 0, 1 ,2라는 값이 전달됨.

registerEnumType(UserRole, { name: 'UserRole' }); // GraphQL용 필드타입. Client, Owner, Delivery 그대로 사용됨.

@InputType({ isAbstract: true }) // MappedTypes를 통해 해당 GraphQL 엔티티로 dto 생성하기 위해 필요. isAbstract: GraphQL 스키마에서는 @InputType는 제외.
@ObjectType() // GraphQL 스키마에 @ObjectType만 생성. (동일명 스키마 중복 생성 금지)
@Entity() // TypeORM
export class UserEntity extends CoreEntity {
  @Field((type) => String) // GraphQL
  @Column({ unique: true })  // TypeORM // 중복 불가. => DB에 같은 이메일로 여러 계정 생성 불가. 
  @IsEmail() // class-validator
  email: string;

  @Field((type) => String)
  @Column()
  @IsString()
  password: string;

  @Field((type) => UserRole) // GraphQL
  @Column({ type: 'enum', enum: UserRole }) // TypeORM
  @IsEnum(UserRole)
  role: UserRole; // Client, Owner, Delivery

  @Field((type) => Boolean) // GraphQL
  @Column({ default: false }) // TypeORM: DB에 기본값으로 false 설정.
  @IsBoolean()
  emailVerified: boolean;

  @BeforeInsert() // UserEntity를 Repo.create => Repo.save시키기 전에 자동실행.
  @BeforeUpdate() // UserEntity를 Repo.save시킬 때 자동실행.
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10); // 인자1: 해슁할 데이터 / 인자2: saltOrRounds. 몇회.
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // UserEntity로 생성된 repository에서 실행가능한 메서드.
  async checkPassword(givenPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(givenPassword, this.password);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
