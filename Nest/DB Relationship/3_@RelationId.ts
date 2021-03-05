/*   
  @RelationId : 관계ID만을 위해 Entity에 별도로 필드를 생성하는 데코레이터.
  - {loadRelationIds:true} 옵션 없이 자동으로 접근 가능해짐.  
  - 원리: 내부참조: DB상 관계id가 담긴 TypeORM Entity(본인)의 필드에 접근하여 값 복사.
  - 주의: TypeORM Entity에만 생성하고 GraphQL Entity에는 불필요. 

  cf) @Field를 안 붙이는 경우 InputDto에서는 별도의 @Field로 restaurantId 받아야 함.
      - MappedType 활용하여 받을 수 없음. (GraphQL 스키마에 없어서)

  참고: find 메서드의 where로 접근하고 싶은 경우, nested relationships 활용.

  =======================================================================
  cf) Entity에서 관계를 맺는 필드에는 서로 상대방측의 Entity가 담겨야 함.
    - 해당 필드를 통해 실제로 연결된 Entity에 접근 가능하지만
    - 기본적으로 DB에는 관계id가 값으로 담기게 됨.
      - findOne - {loadRelationIds:true} 옵션 사용해야 관계id가 담겨서 찾아와짐.
*/

@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class RestaurantEntity extends CoreEntity {
  // ~~
  @Field((type) => UserEntity) // GraphQL - 음식점은 주인이 존재해야 함.
  @ManyToOne((type) => UserEntity, (user) => user.restaurants, {
    onDelete: 'CASCADE', // 연결된 User가 사라지면 모든 음식점 데이터들도 자동 삭제.
  })
  owner: UserEntity; // 여러 restaurant는 하나의 owner(주인인 User)에만 연결됨.
  // Many쪽에만 category & owner 필드들 생성 => DB상으로는 관계id 담김.

  @RelationId((restaurant: RestaurantEntity) => restaurant.owner) // TypeOrm 목적. // GraphQL - @Field 불필요.
  ownerId: number; // 내부참조: DB상 관계id가 담기게 되는 필드의 값을 복사해오는 필드.
   // @Field가 아니므로 InputDto에서는 별도로 @Field로 restaurantId 받아야 함.
}
// ================================================
// [edit-restaurant.dto.ts]
@InputType() // => MappedType으로 dto로 dto 생성도 가능.
export class EditRestaurantInputDto extends PartialType(
  CreateRestaurantInputDto,
) {
  @Field((type) => Number)
  restaurantId: number; // 수정할 음식점의 id은 필수로로 받기
}
// ================================================
// [restaurants.service.ts]
@Injectable()
export class RestaurantService {
  // ~~
  async editRestaurant(
    owner: UserEntity,
    editRestaurantDto: EditRestaurantInputDto,
  ): Promise<EditRestaurantOutputDto> {
    const restaurant = await this.restaurantRepo.findOne(
      editRestaurantDto.restaurantId,
    );
    console.log(restaurant);
  }
}
// localhost:3000/graphql
mutation {
  editRestaurant(input: {
    name: "Korean Fried Chicken New1",
    restaurantId: 1
  }){
    ok,
    error,
  }
}
/*
RestaurantEntity {
  id: 1,
  createdAt: 2021-02-25T16:17:59.490Z,
  updatedAt: 2021-02-25T16:17:59.490Z,
  name: 'Korean Fried Chicken1',
  coverImg: 'http://img-address',
  address: 'Seoul SeochoGu',
  ownerId: 2
}
*/
