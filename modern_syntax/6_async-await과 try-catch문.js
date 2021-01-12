/*
 async : 함수 내부를 단계별로 실행되도록 하는 방법. 잠시 기다리게 만드는 방법.
 await : 기다려줘야 하는 녀셕 지정. 다음에 실행되어야 할 코드들이 전부 기다려줌.
 (중요) try-catch문을 사용해서 에러를 받아줘야 함. 
  - 디폴트로 에러를 받아내지 못하기 때문 => 에러 발생시 앱 전체가 다 깨지게 됨.
  - 기본적으로 await 코드가 성공적으로 끝나지 않고 에러가 떠도, 바로 다음 코드로 진행됨.
 */
export const home = async (req, res) => {
  try {
    const video_db = await Video.find({}); // 데이터베이스의 모든 비디오 찾아오기. 그동안 await.
    res.render("home", { pageTitle: "Home", video_db }); // await이 끝나면 실행.
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", video_db: [] }); // 에러가 발생한 경우 빈 배열이 되도록 지정
  }
};

// -------------------------------------------------------
/*
  이론
  async/await [ES2017]
  - then, catch가 반복되는 Promise를 더 적은 코드로 사용하기 위한 문법.
  - await이 then을 대체
  - try/catch문으로 catch를 그대로 사용.

  핵심
  - await 프로미스: async function는 해당 프로미스가 resolve 될 때까지 
                    기다린 후에 다음 로직으로 넘어가게 됨. (then의 기능)
  - try/catch 문을 통해 에러 처리

  사용방법
  (1) 함수 앞에 async 추가: 비동기 작업을 수행하고자 하는 함수 앞에 async를 표기
  (2) Promise 앞에 await 추가: 함수 내부에서는 실질적인 비동기 작업이 필요한 위치마다 await 표기
    => Promise의 then과 유사한 효과
     : 자동으로 뒤의 내용을 Promise로 전환.
     : 해당 Promise가 resolve 된 이후에 다음으로 진행. 
  (3) try/catch 문: try 내부에 await 관련 내용. catch는 에러 처리
*/
// async/await와 try/catch문
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({}); // await 프로미스
    user.name = "John";
    user = await user.save(); // await 프로미스
    user = await Users.findOne({ gender: "m" }); // await 프로미스
    // 그 외 코드
  } catch (error) {
    console.log(error);
  }
}

// -----------------------
// (비교) 기존 Promise 문법(verbose) : findOne과 save 메서드 내부에 Promise 객체가 존재하는 경우
function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = "John";
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: "m" });
    })
    .then((user) => {
      // 그 외 코드
    })
    .catch((err) => {
      console.error(err);
    });
}
// ---------------------------------------------------
// ---------------------------------------------------
// async 함수의 반환값은 항상 Promise로 감싸짐
// 실행 후 then을 붙이거나 다른 async 함수 안에서 await 붙여서 처리 가능

async function findAndSaveUser(Users) {
  // 코드 생략
}
findAndSaveUser().then(() => {
  // 코드 생략
});

// 다른 async 함수 안에서 await 붙인 경우
async function other() {
  const result = await findAndSaveUser();
}

// ---------------------------------------------------
// ---------------------------------------------------
// 콜백지옥 해결
var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 1000);
  });
};

var coffeeMaker = async function () {
  var coffeeList = "";
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? "," : "") + (await addCoffee(name));
  };
  await _addCoffee("에스프레소");
  console.log(coffeeList);
  await _addCoffee("아메리카노");
  console.log(coffeeList);
  await _addCoffee("카페모카");
  console.log(coffeeList);
  await _addCoffee("카페라떼");
  console.log(coffeeList);
};

coffeeMaker();
// 에스프레소                                    (1000ms 후 출력)
// 에스프레소, 아메리카노                        (2000ms 후 출력)
// 에스프레소, 아메리카노, 카페모카              (3000ms 후 출력)
// 에스프레소, 아메리카노, 카페모카, 카페라떼    (4000ms 후 출력)
