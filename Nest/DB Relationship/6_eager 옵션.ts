/*
  findOne, findAndCount 등으로 특정 Entity 데이터를 찾았을 때 
  1대다 관계 등 연결된 데이터들은 일반적으로 자동 누락. 
  
  eager 옵션: 연결된 데이터도 자동으로 포함되도록.  
  
  @ManyToOne(
    (type) => CategoryEntity, 
    (category) => category.restaurants, 
    { eager: true }
  ) 
   category: CategoryEntity; 
*/
@InputType("RestaurantInputType", { isAbstract: true }) // dto - 향후 해당 Entity를 기반으로 MappedTypes로 GraphQL DTO 생성 가능해짐.
@ObjectType() // GraphQL 스키마 자동생성 목적 - entity
@Entity() // TypeORM에서 DB에 저장할 데이터 형식 지정 목적. 일종의 Model - entity
export class RestaurantEntity extends CoreEntity {
  // ~~
  @Field((type) => CategoryEntity, { nullable: true }) // GraphQL // 연결된 category 데이터가 없어도 되도록 즉, category 삭제시, 연결된 Restaurants 삭제되지 않도록.
  @ManyToOne((type) => CategoryEntity, (category) => category.restaurants, {
    nullable: true, // 양쪽 모두 연결된 Entity 데이터가 없어도 되는 옵션.
    onDelete: "SET NULL", // 나중에 반대쪽에서 해당 필드에 Entity 데이터 대입하면 값 생성됨.
    eager: true,
  }) // TypeOrm - 연결된 카테고리 데이터 삭제되도 이쪽 restaurant 데이터는 그대로 유지되도록.
  category: CategoryEntity; // 여러 restaurant는 하나의 category에만 연결됨.
}
// =========================================================
@Injectable()
export class RestaurantService {
  // ~~
  async findAllRestaurants({
    page,
  }: FindAllRestaurantsInputDto): Promise<FindAllRestaurantsOutputDto> {
    try {
      const [
        restaurants, // 찾아진 Entity 데이터들의 배열. (take & skip 반영)
        totalResults, // 실제로 DB에 존재하는 전체 데이터의 수.
      ] = await this.restaurantRepo.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalPages = Math.ceil(totalResults / 25);
      return { ok: true, results: restaurants, totalPages, totalResults };
    } catch (e) {
      return { ok: false, error: "Failed to Load Restaurants." };
    }
  }
}
// =========================================================
