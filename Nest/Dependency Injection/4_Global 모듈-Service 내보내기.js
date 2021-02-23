/*
  [Service를 외부에서 접근할 수 있도록 내보내기]

  @Global() & exports: [MailService]
  ==> UsersService에서 MailService에 그대로 접근 가능.
*/
// [mail.module.ts] 
@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    // DynamicModule: 다른 모듈을 반환하는 모듈.
    return {
      module: MailModule, // 모듈명 그대로 설정.
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, MailService],
      // { provide: 'CONFIG_OPTIONS', useValue: options } : options 데이터를 전달하기.
      // MailService: export할 서비스 받기.
      exports: [MailService], // UsersModule에서 사용가능하도록 서비스 export
    };
  }
}
// ========================================================
// [users.service.ts]
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>, // usersRepo의 타입: UserEntity타입의 Repository.
    @InjectRepository(VerificationEntity)
    private readonly verificationRepo: Repository<VerificationEntity>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  // ~~
}
// ========================================================