/*
  [@InputType을 활용한 @ArgsType]
  1) Mapped Types 사용하기 위해 @InputType 활용.
  2) @InputType으로 생성된 DTO를 기반으로 @ArgsType의 DTO 생성
  3) 결과적으로 @ArgsType이므로 @Args() 형식으로 사용. 매개변수명 불필요.
*/
// [update-restaurant.dto.ts]
@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

@ArgsType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
// =========================================================================
// [restaurants.resolver.ts]
@Resolver((of) => Restaurant)  
export class RestaurantResolver {
  // ~~ 
  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
// =========================================================================
// [restaurants.service.ts]
@Injectable()
export class RestaurantService {
  // ~~
  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    this.restaurantRepo.update(id, { ...data }); // id == updateRestaurantDto.id
    // 인자1. criteria: 수정하고 싶은 데이터를 특정하기 위한 필드 지정. id, name 등 DB 검색 방법은 자유.
    // 인자2. partialEntity: 수정하고 싶은 내용이 포함된 객체 데이터.

    // 주의: update 메서드는 해당 엔티티가 DB에 존재하는지는 확인하지 않음.
  }
}
// =========================================================================
// http://localhost:3000/graphql
mutation {
    updateRestaurant(id:1233, data:{name:"Updated!!!!"})
  }
  {
    "data": {
      "updateRestaurant": true
    }
  }
// =========================================================================
// =========================================================================
// [비교) @InputType만 그대로 사용하는 경우, 복수의 @Args 사용 필요. 각 @Args에 매개변수명 부여되어야 함.

// [update-restaurant.dto.ts]
@InputType()
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
// ---------------------------------------
// [restaurants.resolver.ts]
  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('id') id: number,
    @Args('data') data: UpdateRestaurantDto,
  ) {
    return true;
  }

