/*
  Service의 Dependency를 테스트 모듈에 설정하는 방법.
  - @Inject(CONFIG_OPTIONS): AppModule에서 Service로 Inject된 값.
  - createTestingModule의 providers에 { provide & useValue }로 설정.

    const module = await Test.createTestingModule({
      providers: [
        JwtService, // 1) 모듈에서 테스트할 서비스 설정.
        { provide: CONFIG_OPTIONS, useValue: { privateKey: 'testKey' } },
      ], 
    }).compile(); 
*/
// [jwt.service.ts] 
@Injectable() // constructor로 CONFIG_OPTIONS 사용하기 위해 필요.
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
// [jwt.interfaces.ts]
export interface JwtModuleOptions {
  privateKey: string;
}

// ========================================================================
// [jwt.service.spec.ts]
import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService, // 1) 모듈에서 테스트할 서비스 설정.
        { provide: CONFIG_OPTIONS, useValue: { privateKey: 'testKey' } },
        // 1) 모듈의 dependency 설정.
        // 3) Mocking UserEntity. TypeORM 속이기. (provide & useValue)
      ],
    }).compile(); // 1) 각 테스트 전에 테스트 모듈 생성하여 컴파일하도록.
    service = module.get<JwtService>(JwtService); // 2) 테스트 모듈의 서비스 사용할 수 있도록 let 변수에 대입.
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
