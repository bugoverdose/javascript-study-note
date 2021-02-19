/*
  목표: mailgun API로 post 요청 보내기. => 그것만으로 곧바로 메일 보내짐.
  node-mailer 패키지 : 아래 과정을 대신 해주는 npm 패키지.
  
  cURL: 콘솔에서 API 사용하는 방법. Node.js 방식도 가능하지만 모듈 버전 변경 가능.
      : 명령어들 참고하여 Node.js. 방식으로 변형 필요.

=============================================================================
curl -s --user 'api:YOUR_API_KEY' \   
https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
-F from='Excited User <mailgun@YOUR_DOMAIN_NAME>' \
-F to=YOU@YOUR_DOMAIN_NAME \
-F to=bar@example.com \
-F subject='Hello' \
-F text='Testing some Mailgun awesomeness!'

1) GOT 패키지 활용하여 URL 주소 요청. [npm i got]
   - cf) request 패키지는 deprecated. 여전히 사용 가능. 새로운 기능 추가X. => GOT 권장.
   
2) curl -s --user 'api:YOUR_API_KEY' \  
// Basic authorization 방식.  Authorization: Basic ~~
// [api:YOUR_API_KEY]는 [사용자명:비밀번호] 형식.
// ==> [api:YOUR_API_KEY] 문자열을 base64 형식으로 encoding하여 Header에 추가.
   - cf) Buffer.from(원본코드).toString('base64')

headers: {
  Authorization: `Basic ${Buffer.from(
    `api:${this.options.apiKey}`,
  ).toString('base64')}`,
},

3) -F : form을 의미 => form-data 패키지 활용. [npm i form-data]
- form-data 패키지: multipart/form-data stream을 node.js에서 만드는 라이브러리.
*/
// [mail.service.ts]
import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';

@Injectable() // constructor로 CONFIG_OPTIONS 사용하기 위해 필요.
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('testing', 'test!'); // 앱 시작하자마자 메일 보내기 실행.
  }
  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `jwjeong96@gmail.com`); // 이메일 전송 대상. 별도의 인자 받아서 값 대입 필요.
    form.append('subject', subject);
    form.append('text', content); // 이메일 내용.

    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'POST', // mailgun API로 post 요청 보내기.
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`, // curl -s --user 'api:YOUR_API_KEY'
        },
        body: form,
      },
    ); // config injection : options.domain은 .env 파일의 MAILGUN_DOMAIN_NAME 값. AppModule에서 전달받음.
    console.log(response);
    console.log(response.body);
  }
}

// ========================================================
