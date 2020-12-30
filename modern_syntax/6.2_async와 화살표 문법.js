// async와 화살표 문법
const findAndSaveUser = async (Users) => {
  try {
    let user = await Users.findOne({}); // await 프로미스
    user.name = "John";
    user = await user.save(); // await 프로미스
    user = await Users.findOne({ gender: "m" }); // await 프로미스
    // 그 외 코드
  } catch (error) {
    console.log(error);
  }
};

// 위와 동일
async function findAndSaveUser(Users) {
  try {
    // await 프로미스 등
  } catch (error) {
    // 에러처리
  }
}
