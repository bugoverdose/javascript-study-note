const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");

// 1단계) pixel modifier의 size 지정. (css size와 동일하게 설정)
canvas.width = 500;
canvas.height = 500;

// 2단계) path를 stroke할 때의 기본 색상 및 굵기
context.strokeStyle = "black";
context.lineWidth = 2.5;

// 3단계) MouseEvent에 따라 메서드들 실행.
let painting = false; // canvas가 색칠되고 있는지의 여부.

const startPainting = (event) => {
  painting = true;
  console.log(event);
};

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  // offsetX, offsetY : canvas 내의 위치 정보. (MouseEvent.offsetX)
  // clientX, clientY : 브라우저 전체 범위 내의 위치 정보.

  if (!painting) {
    context.beginPath(); // 클릭하지 않는 동안에는 path의 시작점을 설정.
    context.moveTo(x, y); // path의 시작점 재설정. (사용되지 않을 뿐 계속 path 생성)
  } else {
    context.lineTo(x, y); // 클릭하면 실제로 path 연결. Creates a line.
    context.stroke(); // 실제로 path 위치의 pixel값 변경. 색칠.
  }
};

const stopPainting = () => {
  painting = false;
};

if (canvas) {
  // 현재 웹페이지에 canvas가 존재하는 경우 실행.
  canvas.addEventListener("mousedown", startPainting); // mousedown: 마우스를 누르는 이벤트
  canvas.addEventListener("mousemove", onMouseMove); // mousemove: 마우스를 움직이는 이벤트
  canvas.addEventListener("mouseup", stopPainting); // mouseup: 마우스를 떼는 이벤트
  canvas.addEventListener("mouseleave", stopPainting); // mouseleave: 마우스가 캔버스를 떠나는
}
