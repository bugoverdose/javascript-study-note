/*
process 객체
- 현재 실행되고 있는 Node 프로세스에 대한 정보가 담기는 객체
*/
/*
process.exit(코드)
: 실행 중인 Node.js 프로세스를 종료.
: 서버환경에서 실행시, 서버 자체가 멈추게 됨.
: 서버 외의 독립적인 프로그램에서 수동으로 Node를 멈추기 위해 사용됨.

process.exit(0); // 정상종료
process.exit(1); // 비정상종료 - 에러 발생으로 인한 종료
*/
let i = 1;
setInterval(() => {
  if (i === 5) {
    console.log("Node.js 종료");
    process.exit();
  }
  console.log(i);
  i += 1;
}, 1000);
// 1
// 2
// 3
// 4
// Node.js 종료

// ---------------------------------
// 덜 중요. 운영체제나 실행환경별로 다른 동작을 하고 싶을 때 사용

console.log(process.version); // Node.js 버전 (node -v)
// v14.15.3

console.log(process.arch); // 프로세서 아키텍처 정보. x64, arm, ia32 등
// x64

console.log(process.platform); // 운영체제 플랫폼 정보. win32, linux, darwin, freebsd 등
// linux

console.log(process.pid); // 현재 process의 ID 값. 복수의 프로세스 서로 구분할 때 사용
// 11079 (매번 변동)

console.log(process.uptime()); // 프로세스가 시작된 후 흐른 시간. 초 단위
// 0.0256685 (매번 변동)

console.log(process.execPath); // Node.js의 경로
// /home/bugod/.nvm/versions/node/v14.15.3/bin/node

console.log(process.cwd()); // 현재 process가 실행되는 위치
// /home/bugod/javascript-study-note

console.log(process.cpuUsage()); // 현재 cpu 사용량
// { user: 19459, system: 9729 } (매번 변동)
