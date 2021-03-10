/*
  Repo.create() => Repo.save()
  - const newEntity = Repo.create(inputDto)  // 입력된 정보 객체를 토대로 새로운 데이터 생성
  - Repo.save(newEntity) // 생성된 데이터를 DB에 새롭게 저장.

  Repo.create 메서드: 엔티티(클래스)로 인스턴스 생성. 메서드의 인자는 생성할 데이터 객체(Entity 정보) 전달.
  Repo.save 메서드: 엔티티(config된 인스턴스 데이터)를 DB에 저장. 
                  : Promise 형태로 DB에 생성된 엔티티를 return.
  - 두 메서드가 반환하는 데이터는 일치. create의 반환값 == save의 인자 == save의 반환값

  ======================================================
  Repo.find() // 해당 DB에 있는 모든 데이터 찾기. 
  Repo.findOne(criteria) // 디폴트로 id 필드값을 기준으로 데이터 찾기. 특정 필드가 특정 값인 특정 데이터를 찾아줌. 
  Repo.findOneOrFail(criteria) // DB에서 해당 데이터 못 찾으면 에러 발생 => catch문으로 이동.

  ======================================================
  Repo.update(criteria, partialEntity) 
  - 인자1. 업데이트할 데이터를 찾는 기준. 디폴트로 id 필드 기준. 특정 필드가 특정 값인 특정 데이터를 찾아줌. 
  - 인자2. 해당 데이터의 어떤 필드들을 어떻게 업데이트할 것인가. 어떤 값을 대입할 것인가.
  - 주의) DB에 실제로 데이터 존재 여부 확인X. SQL문을 보낼 뿐.
  - 비교) Repo.save : 이미 DB에 관련 데이터가 존재하는 경우 해당 데이터 업데이트함.
*/
@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity) // RestaurantEntity 엔티티를 기반으로 Repository 생성.
    private readonly restaurantRepo: Repository<RestaurantEntity> // restaurantRepo라는 이름. 타입은 Repository<RestaurantEntity>.
  ) {} // restaurantRepo를 통해 repository 메서드들 활용 가능해짐.

  getAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepo.find();
    // Repository가 DB에 접근하는 방식 지정.
    // find()는 async 메서드이므로 Promise 타입 지정 필요.
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantInputDto
  ): Promise<RestaurantEntity> {
    const newRestaurant = this.restaurantRepo.create(createRestaurantDto);
    // Repo.create 메서드: 엔티티(클래스)로 인스턴스 생성. 메서드의 인자로 생성할 데이터 객체 전달.
    return this.restaurantRepo.save(newRestaurant); // Repo.save 메서드: 엔티티(config된 인스턴스 데이터)를 DB에 저장. Promise를 return.
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    this.restaurantRepo.update(id, { ...data }); // id == updateRestaurantDto.id
    // 인자1. criteria: 수정하고 싶은 데이터를 특정하기 위한 필드 지정. id, name 등 DB 검색 방법은 자유.
    // 인자2. partialEntity: 수정하고 싶은 내용이 포함된 객체 데이터.

    // 주의: update 메서드는 해당 엔티티가 DB에 존재하는지는 확인하지 않음.
  }
}
// ==============================================================
// create의 반환값 == save의 인자 == save의 반환값
@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>
  ) {}
  async createPodcast({
    title,
    category,
  }: CreatePodcastInput): Promise<CreatePodcastOutput> {
    try {
      const newPodcast = this.podcastRepository.create({ title, category });
      const created = await this.podcastRepository.save(newPodcast);
      console.log(created === newPodcast); // true
      // const { id } = await this.podcastRepository.save(newPodcast);
      return {
        ok: true,
        id: created.id,
      };
    } catch (e) {
      console.log(e);
      return this.InternalServerErrorOutput;
    }
  }
}
