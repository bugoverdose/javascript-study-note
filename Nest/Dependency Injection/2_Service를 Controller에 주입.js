/*
  [Service를 같은 모듈 내에서 Controller에 주입]
  : @Module에서 providers에 Service를 주입했기 때문에
    Controller의 constructor에서 service 변수에 Service 타입을 지정한 것만으로도
    Service 클래스의 메서드들 사용 가능해지는 현상. (this.service.getAll() 등)

  조건1) @Injectable 데코레이터가 MoviesService를 꾸며줘야 함. 
     - @Injectable: a decorator that marks a class as a provider
  조건2) providers(MoviesService)를 import하여 controllers(MoviesController)에 주입.
*/ 
// [movies.module.ts]
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

// =====================================================
// [movies.service.ts] 
@Injectable() // 해당 서비스를 다른 곳에 주입하기 위해 필요.
export class MoviesService {
  private movies: Movie[] = []; // movies는 Movie들의 배열. 초기값은 빈 배열.

  getAll(): Movie[] {
    // Movie들의 배열을 반환.
    return this.movies; // fake db. 실제로는 데이터베이스에 대한 query.
  }
// =====================================================
// [movies.controller.ts]
@Controller('movies')  
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
 
  @Get()  
  getAll(): Movie[] { 
    return this.moviesService.getAll();
  }
// =====================================================