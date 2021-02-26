/*
Custom Repository - TypeOrm 목적. 
- 특정 Entity로 Repo 직접 생성 + 사용 가능한 Repo 메서드들 직접 지정.
  
1단계) Entity를 통해 자체 Repository 생성. Repo 메서드들 추가 지정. 
  @EntityRepository(UserEntity) 
  export class CategoryRepository extends Repository<CategoryEntity> {~~}
  - 기본 Repo 메서드들 + 새롭게 지정한 메서드들 모두 활용 가능
  - 비교) AbstractRepository<CategoryEntity> => 새롭게 지정한 메서드들만 사용 가능.

2단계) Dependecy Injection  
- RestaurantsModule의 imports: [TypeOrmModule.forFeature([RestaurantEntity, CategoryRepository])],
- RestaurantService의 constructor: private readonly categoryRepo: CategoryRepository,
  - @InjectRepository(Entity) 불필요. Entity로 Repo를 Inject할 필요가 없어짐.

3단계) 평범한 Repo처럼 사용 가능. Repo.findOne처럼 직접 지정한 메서드들 사용 가능. 
  - this.categoryRepo.getOrCreate(~);

*/
// [repositories/category.repository]
@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async getOrCreate(categoryInput: string): Promise<CategoryEntity> {
    const categoryName = categoryInput
      .trim() // 앞뒤에 공백 제거. (ex. '  Korean BBq ' => 'Korean BBq')
      .toLowerCase() // 전부 소문자 전환. (ex. 'Korean BBq' => 'korean bbq')
      .replace(/ +/g, ' '); // 공백 중복 제거. (ex. 'korean   bbq' => 'korean bbq')
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.findOne({ slug: categorySlug }); // <=> this.categoryRepo.findOne
    if (!category) {
      category = await this.save(
        this.create({ slug: categorySlug, name: categoryName }),
      ); // 현재 입력된 카테고리명의 slug가 DB에 존재하지 않으면 새롭게 생성.
    } // 이미 DB에 존재하면 그대로 return. // DB에 없으면 생성하고 return.
    return category;
  }
}

// ====================================================================
// [restaurants.module.ts]
@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, CategoryRepository])],   
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}

// ====================================================================
// [restaurants.service.ts]
@Injectable()
export class RestaurantService {
  constructor(
    // InjectRepository하려면 RestaurantsModuled에서 import 필요: [TypeOrmModule.forFeature([RestaurantEntity, CategoryEntity])],
    @InjectRepository(RestaurantEntity) // RestaurantEntity 엔티티를 기반으로 Repository 생성.
    private readonly restaurantRepo: Repository<RestaurantEntity>, // restaurantRepo를 통해 repository 메서드들 활용 가능해짐.
    private readonly categoryRepo: CategoryRepository, // @InjectRepository 불필요
  ) {}

    this.categoryRepo.getOrCreate(
        createRestaurantInput.categoryInput,
    );
}

// ====================================================================
