/*
  InputType을 dto 쪽에서만 설정해도 MappedTypes 사용은 가능.
*/

// [create-restaurant.dto.ts]
@InputType() // MappedType 사용 위해서는 @ArgsType 대신 @InputType 사용해야 함.
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ["id"], // id Field만 제외
  InputType // @ObjectType인 Restaurant를 @InputType으로 사용
) {}
// ======================================================================
// [restaurant.entity.ts]
@ObjectType() // GraphQL 스키마 자동생성 목적
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;
  // ~~
}
// ======================================================================
