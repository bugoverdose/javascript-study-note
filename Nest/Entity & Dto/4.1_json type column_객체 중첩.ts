// [dish.entity.ts]
@InputType('DishChoiceInputType', { isAbstract: true }) // dto. => MappedTypes로 GraphQL DTO 생성 가능.
@ObjectType() // GraphQL
class DishChoice {
  @Field((type) => String) // GraphQL만
  choiceName: string; // small, medium, big, extra-big

  @Field((type) => Number, { nullable: true })
  extraPrice?: number; // DishChoice별 추가비용. +0, +2, +5, +10
}

@InputType('DishOptionInputType', { isAbstract: true }) // dto. 필요 없으면 삭제 가능.
@ObjectType() // GraphQL
class DishOption {
  @Field((type) => String) // GraphQL만
  optionName: string; // 특정 옵션명. (portion size 양. / 더 맵게)

  @Field((type) => [DishChoice], { nullable: true }) // 세부 선택지가 필요 없을 수도 있음.
  choices?: DishChoice[]; // 해당 옵션의 세부 선택지들. (small, medium, big, extra-big)

  @Field((type) => Number, { nullable: true })
  extraPrice?: number; // 옵션 자체 추가비용. DishChoice별 추가비용과 무관.
}

@InputType('DishInputType', { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class DishEntity extends CoreEntity {
  @Field((type) => String) // GraphQL (코드 가독성 위해. 인자로 함수 설정. 매개변수명은 자유. 생략도 가능)
  @Column() // TypeORM
  @IsString() // dto + entity validation
  @Length(5)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo: string; // url 혹은 encoding된 이미지 파일. 대체로 url 사용.

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 140)
  description: string;

  @Field((type) => RestaurantEntity) // GraphQL
  @ManyToOne(
    (type) => RestaurantEntity, // 이쪽 DB에 저장될 연결된 데이터의 타입.
    (restaurant) => restaurant.menu, // 연결된 이쪽의 DishEntity 데이터들이 반대쪽 DB에서 담기는 필드.
    { onDelete: 'CASCADE', nullable: false }, //  반대쪽의 restaurant가 삭제되면 이쪽에 연결된 모든 dish 데이터들도 자동 삭제.
  ) // TypeOrm - 주의: @ManyToOne는 디폴트값이 {nullable: true} => dish 생성시, restaurant값을 필수로 받을려면 nullable: false 적용 필수.
  restaurant: RestaurantEntity; // 여러 dish는 하나의 restaurant에만 연결됨.

  @RelationId((dish: DishEntity) => dish.restaurant) // TypeOrm 목적. // GraphQL - @Field 불필요.
  restaurantId: number; // 내부참조: DB상 관계id가 담기게 되는 필드의 값을 복사해오는 필드.
  // @Field가 아니므로 InputDto에서는 별도로 @Field로 restaurantId 받아야 함.

  @Field((type) => [DishOption], { nullable: true }) // GraphQL
  @Column({ type: 'json', nullable: true }) // TypeORM
  @IsOptional()
  options?: DishOption[];
}

// =====================================================================
// localhost:3000/graphql
mutation{
  createDish(input: {
    restaurantId: 1,
    name: "Volcano Hot Chicken",
    price: 10,
    description: "Delicious & Hot",
    options: [
      {
        optionName: "spiciness", 
        choices: [
          { choiceName: "baby-level"}, 
          { choiceName: "very-hot"}, 
          { choiceName: "kill-me"},  
        ],
        extraPrice: 0
      }, 
      {      
        optionName: "portion size", 
        choices: [
          { choiceName: "small", extraPrice: 0}, 
          { choiceName:  "big" , extraPrice: 2}, 
          { choiceName: "jumbo", extraPrice: 5}, 
        ]
      },
      {
        optionName: "fast-delivery",
        extraPrice: 3
      }
    ]
  }){
    ok,
    error,
  }
}

// =====================================================================
options
[{"optionName":"spiciness",
"choices":[
  {"choiceName":"baby-level"},
  {"choiceName":"very-hot"},
  {"choiceName":"kill-me"}],
"extraPrice":0},

{"optionName":"portion size",
"choices":[
  {"choiceName":"small","extraPrice":0},
  {"choiceName":"big","extraPrice":2},
  {"choiceName":"jumbo","extraPrice":5}]},

{"optionName":"fast-delivery",
"extraPrice":3}]
// =====================================================================
