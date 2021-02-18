/*
  [외부의 Entity를 Service에 주입]
  1) AppModule에 TypeOrmModule.forRoot의 entities로 사용할 엔티티들 대입.
     => DB에 해당 엔티티별 table들 생성됨.
  2) 특정 Module에 TypeOrmModule.forFeature로 VerificationEntity 주입
  3) Service의 constructor에서 해당 VerificationEntity로 Repo 주입 가능해짐.
     - @InjectRepository(VerificationEntity) verificationRepo: Repository<VerificationEntity>,
*/  
// [app.module.ts]
@Module({
  imports: [
    // ~~
    TypeOrmModule.forRoot({
      // ~~
      entities: [UserEntity, VerificationEntity],
    }),  
    UsersModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {~~}

// =================================================================
// [users.module.ts]
import { VerificationEntity } from './entities/verificaton.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, VerificationEntity])],
  // UsersService에서 UserEntity & VerificationEntity 사용가능해짐.
  // ConfigService(환경변수들) & JwtService의 경우 isGlobal & @Global이므로 import 불필요.
  providers: [UsersResolver, UsersService],
  exports: [UsersService], // 외부에서 사용 가능하도록 내보내기 (JwtMiddleware 등)
})
export class UsersModule {}

// =================================================================
// [users.service.ts]
@Injectable() // 해당 서비스를 다른 곳에 주입하기 위해 필요.
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,  
    @InjectRepository(VerificationEntity)
    private readonly verificationRepo: Repository<VerificationEntity>,
    // ~~
  ) {}
} 
// =================================================================
