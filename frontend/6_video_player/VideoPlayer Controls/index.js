import "./styles.css";

const body = document.querySelector("body");
const videoContainer = document.querySelector("#jsvideoContainer");
const videoPlayer = document.querySelector("#jsvideoContainer video");
const controlsContainer = document.querySelector("#jsVideoControlsContainer");
const playBtn = document.querySelector("#jsPlayButton");
const volumeBtn = document.querySelector("#jsVolumeBtn");
const currentTime = document.querySelector("#jsCurrentTime");
const totalTime = document.querySelector("#jsTotalTime");
const playRange = document.querySelector("#jsPlayRange");

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

const handleEnded = () => {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  videoPlayer.play();
};
// =====================================
const handleMuteClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};
// =====================================
const timeFormat = (seconds) => {
  const totalSec = parseInt(seconds, 10);
  let min = Math.floor(totalSec / 60);
  let sec = totalSec - min * 60;
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

const getCurrentTime = () => {
  currentTime.innerHTML = timeFormat(videoPlayer.currentTime);
};
const setTotalTime = () => {
  const totalTimeString = timeFormat(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};
// =====================================
const paintPlayRange = () => {
  playRange.max = videoPlayer.duration;
  const paintCurrentValue = () => {
    playRange.value = videoPlayer.currentTime;
  };
  setInterval(paintCurrentValue, 1000);
};
// =====================================
const hideControlsContainer = () => {
  controlsContainer.classList.remove("show");
};
const showControlsContainer = () => {
  controlsContainer.classList.add("show");
};

let eventId;
const hideControlsOnTimeout = () => {
  showControlsContainer();
  // console.log("previous eventId: ", eventId);
  clearTimeout(eventId); // 이전 mousemove 이벤트 때 발생한 setTimeout 중단.
  eventId = setTimeout(hideControlsContainer, 1500);
  // console.log("new eventId: ", eventId);
};
// =====================================
const init = () => {
  playBtn.addEventListener("click", handlePlayStop);
  body.addEventListener("keydown", handleSpaceKey);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeBtn.addEventListener("click", handleMuteClick);
  setTotalTime();
  paintPlayRange();
  videoContainer.addEventListener("mouseenter", showControlsContainer);
  videoContainer.addEventListener("mouseleave", hideControlsContainer);
  videoContainer.addEventListener("mousemove", hideControlsOnTimeout);
};

if (videoContainer) {
  init();
}
