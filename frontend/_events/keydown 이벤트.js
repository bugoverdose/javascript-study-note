/*
  body.addEventListener("keydown", (event) => console.log(event.code));
  - 스페이스바 누르면 Space 출력.
*/

// Space바 누르면 영상 재생/중단 기능
const body = document.querySelector("body");
const videoContainer = document.querySelector("#jsvideoContainer");
const videoPlayer = document.querySelector("#jsvideoContainer video");
const playBtn = document.querySelector("#jsPlayButton");

const handlePlayStop = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleSpaceKey = (event) => {
  if (event.code === "Space") {
    handlePlayStop();
  }
};

const init = () => {
  playBtn.addEventListener("click", handlePlayStop);
  body.addEventListener("keydown", handleSpaceKey);
};

if (videoContainer) {
  init();
}
