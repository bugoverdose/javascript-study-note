/*
  Column Type
  - 구조화된 데이터. 특정 형태를 지닌 데이터를 활용하고 싶지만,
    DB에 별도의 table 생성하고 싶지 않을 때. Repo 메서드들 불필요할 때.
  - 비교) 별도의 DishOptionsEntity 생성 + @ManyToOne 등의 관계 설정히면 번거로움. 
  - ex) '피자' 메뉴에 치즈 추가, 페페로니 추가 등 옵션 적용 기능 구현 가능.

  =============================================================================
  1) @ObjectType() & @Field들로 별도의 타입 생성

  2) @Column({type:"json"})
  - json 데이터 저장 가능. // json: MySQL & PostgreSQL에서 지원하는 데이터타입.
  - GraphQL 측면으로 타입 생성하여 해당 json 칼럼의 값으로 사용.
  => Query/Mutation에서 평범하게 객체 형식으로 데이터 입력 & 활용 가능.
*/
// [dish.entity.ts]
@InputType('DishOptionInputType', { isAbstract: true }) // dto. 필요 없으면 삭제 가능.
@ObjectType() // GraphQL
class DishOption {
  @Field((type) => String) // GraphQL만
  name: string; // 특정 옵션명. (portion size 양. / 더 맵게)

  @Field((type) => [String], { nullable: true }) // 세부 선택지가 필요 없을 수도 있음.
  choices?: string[]; // 해당 옵션의 세부 선택지들. (small, medium, big, extra-big)

  @Field((type) => Number, { nullable: true })
  extraPrice?: number; // 추가 비용.
}

@InputType('DishInputType', { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class DishEntity extends CoreEntity {
  // ~~
  @Field((type) => [DishOption], { nullable: true }) // GraphQL
  @Column({ type: 'json', nullable: true }) // TypeORM
  @IsOptional()
  options?: DishOption[];
}

// =====================================================================
// [create-dish.dto.ts]
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/common/dtos/output.dto';
import { DishEntity } from '../entities/dish.entity';

@InputType() // MappedType 사용 위해 필요. (비교. @ArgsType)
export class CreateDishInputDto extends PickType(DishEntity, [
  'name',
  'price',
  'description',
  'options',
]) {
  @Field((type) => Number)
  restaurantId: number; // Entity쪽에서 @Field로 생성X => MappedType 활용 불가. (GraphQL 스키마에 없어서)
}

@ObjectType()
export class CreateDishOutputDto extends CoreOutputDto {}

// =====================================================================
// [restaurants.service.ts] 
@Injectable()
export class RestaurantService {
  // ~~
  async createDish(
    owner: UserEntity,
    createDishInput: CreateDishInputDto,
  ): Promise<CreateDishOutputDto> {
    try {
      const restaurant = await this.restaurantRepo.findOne(
        createDishInput.restaurantId,
      ); // 1) 음식점id를 통해 요리가 생성될 음식점 찾기.
      if (!restaurant) {
        return { ok: false, error: 'Restaurant Not Found.' };
      }
      if (owner.id !== restaurant.ownerId) {
        return { ok: false, error: 'You are not the owner of the restaurant.' };
      } // 2) 현재 사용자가 해당 음식점의 주인인지 체크.
      await this.dishRepo.save(
        this.dishRepo.create({ ...createDishInput, restaurant }),
      ); // 3) dish.restaurant 필드를 통해 해당 음식점에 연결된 요리 생성하여 DB에 저장.
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to create a new dish' };
    }
  }
}
// =====================================================================
// =====================================================================
// localhost:3000/graphql
mutation{
  createDish(input: {
    restaurantId: 1
    name: "Volcaon Hot Chicken",
    price: 10,
    description: "Delicious & Hot",
    options: [
      {name: "Spiciness", choices: ["baby-level", "very-hot", "kill-me"]}
    ]
  }){
    ok,
    error,
  }
}
{
  "data": {
    "createDish": {
      "ok": true,
      "error": null
    }
  }
}
// =====================================================================
query{
  findRestaurantById(input: {
    restaurantId:1
  }){
    ok,
    error, 
    restaurant{
      id,
      name,
      menu{
        name,
        options {
          name,
          choices
        }
      }
    }
  }
}
{
  "data": {
    "findRestaurantById": {
      "ok": true,
      "error": null,
      "restaurant": {
        "id": 1,
        "name": "Korean Fried Chicken1",
        "menu": [
          {
            "name": "Volcaon Hot Chicken",
            "options": [
              {
                "name": "Spiciness",
                "choices": [
                  "baby-level",
                  "very-hot",
                  "kill-me"
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
// =====================================================================