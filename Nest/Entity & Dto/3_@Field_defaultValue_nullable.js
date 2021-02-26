/*
Optional Types
1) 특정 필드의 데이터를 입력하지 않는 경우 디폴트값이 대입되도록 설정하는 방법.

@Column({ default: 디폴트값 }) // TypeORM : DB에는 언제나 해당 디폴트값이 포함되어 전달됨.
@IsOptional() // GraphQL DTO Validation상 선택사항. Mutation 사용시, 인자로 해당 필드 누락 가능하도록 설정.
isVegan?: boolean; // TS 측면에서 선택사항 지정.

===================================================================
2) @Field의 옵션에 따라 GraphQL dto에 디폴트 값 대입 여부 설정 가능. 
   - nullable : GraphQL 스키마에서 생략 가능 옵션.
   - defaultValue : GraphQL 스키마에 특정 디폴트값 자동 대입 옵션.

방법1)
@Field((type) => String, { defaultValue: 'To Be Added' }) 
- @Field의 defaultValue 옵션은 자동으로 dto에 디폴트값이 담기게 됨.
  => GraphQL resolver에서 인자로 받는 createRestaurantDto에 디폴트 값이 자동 포함됨.
- @Column의 default 옵션, @IsOptional, address?: ~ 등의 작업 불필요한 것일 수도 있음. (불확실)
  다만 예상치 못한 버그 예방하기 위해 전부 다 입력해주는 것 권장? - GraphQL 스키마와 무관한 TypeORM 작업시 문제 발생 가능할지도?

방법2)
@Field((type) => Boolean, { nullable: true }) 
- @Field의 nullable 옵션이 참이면 해당 필드 값 누락시 dto에도 담기지 않음.
  => GraphQL resolver에서 인자로 받는 createRestaurantDto에 디폴트 값 제외됨.
*/
// ================================================================
// [restaurant.entity.ts] 방법1. 해당 인자 누락시, GraphQL상 defaultValue로 'To Be Added' 대입되어 DB에도 'To Be Added'가 저장됨.
@ObjectType()  
@Entity()  
export class Restaurant {
  // ~~~
  // @IsOptional() // DTO Validation상 선택사항. Mutation 사용시, 인자로 해당 필드 누락 가능하도록.
  @Field((type) => String, { defaultValue: 'To Be Added' }) // GraphQL 스키마에서 입력 안하면 자동으로 대입되는 값.
  @Column() // @Column({ default: 'To Be Added' }) // TypeORM: DB에서 디폴트로 'To Be Added'라는 데이터 생성.
  @IsString()
  address: string; 
  // ~~~
}
// ================================================================
// [restaurant.entity.ts] 방법2. 해당 인자 누락시, GraphQL에도 누락됨. 다만, @Column의 default 옵션에 따라 DB에는 기본적으로 true값 저장됨.
import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { Column, Entity } from 'typeorm';

@ObjectType()  
@Entity()  
export class Restaurant {
  // ~~~
  @Field((type) => Boolean, { nullable: true }) // 인자로 해당 필드 값 누락시 dto에도 담기지 않음. GrapqhQL상 누락 가능.
  @Column({ default: 'To Be Added' }) // TypeORM: DB에서 디폴트로 'To Be Added'라는 데이터 생성.
  @IsOptional() // DTO validation: 인자로 해당 필드 누락해도 되도록 설정.
  @IsBoolean()
  address?: string;
  // ~~~
}
// ================================================================
// http://localhost:3000/graphql 
mutation {
  createRestaurant(input:{
    name:"Nicolas2",  
    ownerName:"ASDsdfg2", 
    // 방법1) address 필드는 입력하지 않아도 'To Be Added'라는 값이 자동대입되어 query 보내짐.
    // 방법2) query에는 없지만 address: 'To Be Added'라는 값이 자동대입됨.
  }) 
}
{
  "data": {
    "createRestaurant": true
  }
}
// ================================================================
