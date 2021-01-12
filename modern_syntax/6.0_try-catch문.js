/*
 try-catch문은 에러를 받아내는 목적.
  - 특히 async-await은 에러를 받아내지 못하기 때문에 필수
  
  throw Error() : try문 내에서 throw Error() 실행시, 즉시 catch 문으로 이동.
  - return 등으로 과정 끊을 필요 없음. 별도의 redirection 생략 가능.
 */
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error(); // Route Protection. : 비디오 생성자와 현재 로그인된 사용자가 다른 경우 에러 => catch문으로 이동
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
