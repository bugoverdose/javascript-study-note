/*
  인스턴스 생성 후 실행하는 메서드를 spy하는 방법.
  - 클래스.prototype의 메서드에 접근.
  - 직접 new 생성자함수 형식으로 인스턴스 생성 불필요.

   const formSpy = jest.spyOn(FormData.prototype, 'append');  
   expect(formSpy).toHaveBeenCalledTimes(6); 

  cf) npm 모듈 그 자체를 mock한 경우 활용 필요.
*/
// [mail.service.ts]
@Injectable() // constructor로 CONFIG_OPTIONS 사용하기 위해 필요.
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  async sendEmail(to: string) {
    const form = new FormData();
    form.append('to', to); // 이메일 전송 대상.
    // ~~
}

// ========================================================================
// [mail.service.spec.ts]  
import * as FormData from 'form-data';
 
jest.mock('form-data'); // implementation 없이 got 모듈 자체를 mock.
 
describe('MailService', () => {
  let service: MailService;
  // ~~
  describe('sendVerificationEmail', () => {
    it('should call sendEmail', () => {
      const sendVerificationEmailArgs = {
        email: 'test.@naver.com',
        code: 'code',
      };
      jest.spyOn(service, 'sendEmail').mockImplementation(async () => {});
      // ~~      
    });
  });

  describe('sendEmail', () => {
    it('should send a email', () => {
      service.sendEmail('subject', 'to', 'template', [
        { key: 'code', value: 'code' },
        { key: 'username', value: 'email' },
      ]);
      const formSpy = jest.spyOn(FormData.prototype, 'append'); // FormData의 인스턴스에 상속될 append 메서드 접근하여 spy.
      // const form = new FormData(); => // form.append(~)
      expect(formSpy).toHaveBeenCalledTimes(6); 
    });
  });
});
