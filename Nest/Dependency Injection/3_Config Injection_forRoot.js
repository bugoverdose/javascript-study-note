/*
  Config Injection
  1) AppModule에서 MailModule.forRoot의 인자로 
     MailModuleOptions 인터페이스(apiKey, domain, fromEmail) 변수 값 보내기

  2) MailModule의 forRoot 메서드로 MailModuleOptions 인터페이스 인자 받기.
     MailService는 providers에 설정.
  
  3) MailService의 constructor 메서드에서 options 매개변수 설정. 
  ===> AppModule의 MailModule에 넣은 apiKey, domain, fromEmail 변수 값은 
       앱 구동시 곧바로 MailService의 options에 자동으로 담김. 
*/
// [mail.service.ts]
@Injectable() // constructor로 CONFIG_OPTIONS 사용하기 위해 필요.
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    console.log(options);
  }
}
// ========================================================
// [mail.module.ts]
@Module({})
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
// [app.module.ts]
@Module({
  imports: [
    // ~~
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_APIKEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }), 
  ], 
})
export class AppModule implements NestModule {~}
 
// ========================================================
// [mail.interfaces]
export interface MailModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

// ========================================================
// [.env.dev]
MAILGUN_APIKEY=780db9c26e26~~~
MAILGUN_DOMAIN_NAME=sandbox5852d7~~
MAILGUN_FROM_EMAIL=jwjeong96@gmail.com

// ========================================================
