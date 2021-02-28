/*
  Int & Float는 GraphQL 타입. 
  - @Field에서 반환하는 방식으로만 사용 가능.
  - 다만, import 필요.
    - Number 타입은 별도 작업 불필요

  class-validator로는 @IsInt() & @IsNumber()만 존재.
  
  cf) TS에서는 그냥 number 타입 사용. 
*/
import { Field, InputType, Int, Float, ObjectType } from "@nestjs/graphql";

@InputType("DishInputType", { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class ExampleEntity {
  // ~~
  @Field((type) => Number)
  dishId: number;

  @Field((type) => Int)
  @Column()
  @IsInt() // class-validator: 정수인지 체크
  price: number;

  @Field((type) => Float)
  @Column()
  @IsNumber() // class-validator: 숫자인지 체크
  total: number;
}
