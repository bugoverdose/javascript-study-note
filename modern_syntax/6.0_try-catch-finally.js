/*
 try-catch문은 에러를 받아내는 목적.
  - 특히 async-await은 에러를 받아내지 못하기 때문에 필수
  
  throw Error() : try문 내에서 throw Error() 실행시, 즉시 catch 문으로 이동.
  - return 등으로 과정 끊을 필요 없음. 별도의 redirection 생략 가능.

  try-catch-finally
  - try와 catch 중 하나라도 실행되면 최종적으로 finally 실행.
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

// -------------------------

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true, // media에 접근을 허용하는지 기다려야 함 => await
      video: { width: 1280, height: 720 }, // 인자는 configuration 객체
    }); // stream은 src 객체. 파일주소와는 다름. stream 관련 정보들. not stream 그 자체.
    videoPreview.srcObject = stream;
    videoPreview.muted = true; // 오디오도 녹음되지만, 사용자 본인에게는 들리지 않도록.
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "☹️ Cant record"; // 녹음 권한을 받지 못한 경우.
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};
