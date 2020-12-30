/*
  Promise.all : 복수의 Promise를 한번에 실행 가능.
   - 모든 Primise가 resolve될 때까지 기다린 후에 then으로 넘어가게 됨.
   - Promise.all의 매개변수에는 각각의 Promise 결과값이 배열로 들어가게 됨.
   - Promise들 중 하나라도 reject되면 catch로 이동.

  Promise.resolve: 즉시 resolve하는 Promise 생성.
  Promise.reject: 즉시 reject하는 Promise 생성.
*/
const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// ['성공1', '성공2'];

// ----------------------------------------------
// for await of문을 통한 프로미스 배열 순회 [ES2018]
const promise1 = Promise.resolve("성공1");
const promise2 = Promise.resolve("성공2");
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
// 성공1
// 성공2
