/*  
  [DTO] 전부 @InputType로 통일하는 것도 괜찮은 방법.
  - 기본적으로 dto 사용하지 않아도 @Mutation 작성 가능.
  - 다만, @InputType() 혹은 @ArgsType()을 사용해야 인자 부분의 코드 중복 제거 가능
  - 또한 dto에 대해 class-validator 활용도 가능해짐. 
  
  @InputType: 모든 @Field 데이터들을 하나의 DTO 객체로 모아 GrapqhQL에 인자로 전달. 
            : Mapped Types 사용하기 위해 필수.
            - @Mutation에 하나의 @Args에 하나의 인자로서 대입. @Args에 문자열 대입 필수.
            => Args("매개변수명") inputDto: InputDto

  @ArgsType: 개별 @Field 데이터들을 별개의 인자로 각각 GrapqhQL에 전달.
           : Mapped Types 사용 불가.    
           : @Mutation에서 복수의 @Args인자에 각각 매개변수를 하나씩 설정하는 것과 사실상 같음.
           - @Args() 그대로 사용. 매개변수명 지정 불필요. dto의 각 field들을 자동으로 매개변수로 사용하게 됨.
           => Args() inputDto: InputDto

  cf) Mapped Types 사용시 entity를 기반으로 dto 클래스 생성 가능해짐.
      : 상속하는 GraphQL entity & 상속받는 dto 양쪽에 @InputType 필요.
*/
// @InputType
// [dto/create-restaurant.dto.ts]
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRestaurantDto {
  @Field((type) => String)
  name: string;

  @Field((type) => Boolean)
  isVegan: boolean;
}
// ===================================================================
// [restaurants.resolver.ts]
@Resolver((of) => Restaurant) // 인자로 함수 설정 불필요. 100% 생략 가능. 가독성 목표.
export class RestaurantResolver {
  @Mutation((returns) => Boolean)
  createRestaurant1(
    @Args("createRestaurnatInput") createRestaurnatInput: CreateRestaurantDto
  ): boolean {
    console.log(createRestaurnatInput);
    return true;
  }
}

// ===================================================================
// ===================================================================
// @ArgsType
// [dto/create-restaurant.dto.ts]
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType() // 개별 @Field 데이터들을 별개의 argument로 분리.
export class CreateRestaurantDto {
  @Field((type) => String)
  name: string;

  @Field((type) => Boolean)
  isVegan: boolean;
}

// ===================================================================
// [restaurants.resolver.ts]
@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Mutation((returns) => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    console.log(createRestaurantDto);
    return true;
  }

  // 비교. without ArgumentTypes. 사실상 위와 동일. 각 @Args를 분리해서 받기.
  @Mutation((returns) => Boolean)
  createRestaurant2(
    @Args("name") name: string,
    @Args("isVegan") isVegan: boolean,
    @Args("address") address: string,
    @Args("ownerName") ownerName: string
  ): boolean {
    console.log(name, isVegan);
    return true;
  }
}
