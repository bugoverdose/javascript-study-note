/*
process.env : 서버, DB의 비밀번호, API 키 등 
              서비스의 중요한 키를 저장하는 공간으로 사용 가능.
- 시스템 환경 변수들이 담겨있는 객체.
- 별도의 환경 변수를 임의로 저장 가능.
*/
console.log(process.env);

// 중요한 비밀번호는 process.env의 속성으로 대체 (dotenv 참고)
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;

/*
(불확실)
NODE_OPTIONS=--max-old-space-size=8192
- Node를 실행할 때 옵션들을 입력받는 환경변수
- --max-old-space-size=8192: Node의 메모리를 8GB까지 사용 가능

UV_THREADPOOL_SIZE=8
- Node에서 기본적으로 사용하는 스레드의 개수 조절 가능
*/
