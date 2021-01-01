/*
os 모듈 : 운영체제의 정보가 담기게 되는 Node.js 내장 모듈
- Javascript에서는 운영체제의 정보를 가져올 수 없음.
  Node.js에서는 os 모듈에 정보가 담기기 때문에 가져올 수 있음.
- 일부 메서드는 process 객체의 메서드와 기능이 겹침. 

os 모듈은 일반적인 웹 서비스 제작할 때는 사용 빈도가 그다지 높지 않음.
- 컴퓨터 내부 자원에 빈번하게 접근하는 경우 사용됨.
- 운영체제별로 다른 서비스를 제공하고 싶을 때 os 모듈이 유용할 것.
*/

/* 
os.arch() : 프로세서 아키텍처 정보. x64, arm, ia32 등
- process.arch와 동일

os.platform() : 운영체제 플랫폼 정보. win32, linux, darwin, freebsd 등
- process.platform과 동일
 --------------------------------------------------
os.type() : 운영체제의 종류

os.uptime() : 운영체제 부팅 이후 흐른 시간(초)
- process.uptime()은 Node의 실행 시간. 프로세스가 시작된 후 흐른 시간

os.hostname() : 컴퓨터의 이름
os.release() : 운영체제의 버전

os.homedir() : 홈 디렉토리의 경로
os.tmpdir() : 임시 파일 저장 경로

os.cpus() : 컴퓨터의 코어 정보
os.cpus().length : 코어의 개수. 
- Node.js는 싱글 스레드 프로그래밍이므로 언제나 하나의 코어만 사용하게 됨.
- cluster 모듈을 사용하여 코어 개수에 맞춰 Node.js의 프로세스를 늘릴 수 있음
 
os.freemem() : 사용가능한 메모리(RAM)
os.totalmem() : 전체 메모리 용량
 -------------------------------------------------
os.constants 객체 : 각종 에러와 신호에 대한 정보.
- 에러 코드는 암기 불가. 에러 발생한 경우에만 해당 코드 검색.
*/

const os = require("os");

console.log("운영체제 정보 ------------------------------");
console.log(os.arch()); // x64
console.log(os.platform()); // linux
console.log(os.type()); // Linux
console.log(os.uptime()); // 23737
console.log(os.hostname()); // DESKTOP-Q44OC4Q
console.log(os.release()); // 4.19.128-microsoft-standard

console.log("경로 --------------------------------------");
console.log(os.homedir()); // /home/bugod
console.log(os.tmpdir()); // /tmp

console.log("cpu 정보 ----------------------------------");
console.log(os.cpus());
/*
[
  {
    model: 'Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz',
    speed: 2903,
    times: { user: 48160, nice: 140, sys: 37940, idle: 23632090, irq: 0 }
  },
  {
    model: 'Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz',
    speed: 2903,
    times: { user: 51710, nice: 150, sys: 18830, idle: 23662530, irq: 0 }
  },
    // 그 외 10개 코어 정보 생략
*/
console.log(os.cpus().length); // 12

console.log("메모리 정보 -------------------------------");
console.log(os.freemem()); // 12302233600
console.log(os.totalmem()); // 13353295872

console.log("에러 및 신호 ------------------------------");
console.log(os.constants);
