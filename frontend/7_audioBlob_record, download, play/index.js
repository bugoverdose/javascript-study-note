/*
navigator.mediaDevices.getUserMedia
MediaRecorder
blob
dataavailable
createObjectURL
*/
import "./styles.css";

const recorderContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsRecordBtn");
const recordTime = document.querySelector("#jsRecordTime");

let mediaRecorder;
let intervalId;
let count = 0;

const stopRecording = () => {
  mediaRecorder.stop();

  clearInterval(intervalId);
  mediaRecorder = null;
  intervalId = null;
  count = 0;
  recordBtn.innerHTML = "Start Recording";
  recordTime.innerHTML = "";
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", startRecording);
};

const handleRecordedData = (event) => {
  const audioBlob = new Blob([event.data], { type: "audio/webm;codecs=opus" });
  const downloadLink = document.createElement("a");
  ldownloadLnk.href = URL.createObjectURL(audioBlob);
  ldownloadLnk.download = "recorded.webm"; // 다운로드되는 파일명
  recorderContainer.appendChild(downloadLink);
  downloadLink.click();

  const audioPlayer = document.createElement("audio");
  audioPlayer.controls = true;
  audioPlayer.src = window.URL.createObjectURL(audioBlob);
  recorderContainer.appendChild(audioPlayer);
};

const paintRecordingTime = () => {
  count += 1;
  recordTime.innerHTML = `Recording for ${count}`;
};

const startRecording = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      console.log("1: ", mediaRecorder);

      recordBtn.innerHTML = "Stop recording";
      recordTime.innerHTML = "Recording for 0";
      intervalId = setInterval(paintRecordingTime, 1000);

      recordBtn.removeEventListener("click", startRecording);
      recordBtn.addEventListener("click", stopRecording);
      mediaRecorder.addEventListener("dataavailable", handleRecordedData);
      // dataavailable 이벤트: 녹음된 Blob 데이터 생성시 발생하는 이벤트. event 객체에 해당 데이터 담김.
    })
    .catch((error) => {
      recordBtn.innerHTML = "Can Not Record"; // 녹음 권한을 받지 못한 경우 등등.
      recordBtn.removeEventListener("click", startRecording);
    });
};

const init = () => {
  recordBtn.addEventListener("click", startRecording);
};

if (recorderContainer && navigator.mediaDevices) {
  init();
}
