const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor"); // 해당 클래스의 element들을 객체로
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 500;

// 1단계) pixel modifier의 size 지정. (css size와 동일하게 설정)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 2단계) path를 stroke할 때의 기본 색상 및 굵기
context.strokeStyle = INITIAL_COLOR;
context.lineWidth = 5.0;

context.fillStyle = "white"; // 시작하자마자 배경색 설정. (cavas 디폴트 배경은 투명)
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = INITIAL_COLOR; // fill mode 디폴트 색상

// 3단계) MouseEvent에 따라 메서드들 실행.
let painting = false; // canvas가 색칠되고 있는지의 여부.
let filling = false;

const startPainting = (event) => {
  if (filling === false) {
    painting = true;
  }
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

// 4단계) change color (context.strokeStyle)
const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor; // console.log(event.target.style); // 대상 element에 적용된 css 속성들 정보.
  context.strokeStyle = color;
  context.fillStyle = color; // fill mode 색상 변경
};

Array.from(colors).forEach(
  (colorButton) => colorButton.addEventListener("click", handleColorClick)
  // Array.from(colors) : colors 객체를 배열로 변환
  // 배열.forEach() : 배열의 각 요소에 대해 함수 적용.
); // 배열은 비어있어도 에러가 안뜨므로 if 사이에 안넣어도 문제X

// 5단계) change brush size (context.lineWidth)
const handleRangeChange = (event) => {
  console.log(event.target);
  const brushSize = event.target.value;
  context.lineWidth = brushSize;
};

if (range) {
  range.addEventListener("input", handleRangeChange); // input 이벤트
}

// 6단계) Fill/Paint mode
const handleModeClick = (event) => {
  if (filling === true) {
    painting = true;
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    painting = false;
    mode.innerText = "Paint";
    // context.fillStyle = context.strokeStyle;
    // context.fillRect = context.lineWidth;
  }
};

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

const handleCanvasClick = () => {
  if (filling === true) {
    context.fillRect(0, 0, canvas.width, canvas.height); // 인자1,2: 직사각형 생성 위치, 인자3,4: 생성되는 직사각형의 크기
  }
};

// 7단계) 우클릭 기능 제거.
const handleContextMenu = (event) => {
  event.preventDefault(); // 우클릭해도 선택창이 나타나지 않도록
};

// 8단계) Save (toDataURL 메서드)
const handleSaveClick = () => {
  const image = canvas.toDataURL(); // 주소 형태로 해당 canvas 이미지 정보 저장. 인자를 비워두면 디폴트 확장자 .png 대입.
  // canvas.toDataURL("image/jpeg"); // 인자는 type => .jpeg 확장자 직접 지정
  const link = document.createElement("a"); // a태그를 1개 생성.
  link.href = image; // a 태그의 href 속성에 다운로드되는 파일의 주소 대입.
  link.download = "PaintJS"; // a태그의 download 속성에 다운로드되는 파일의 이름 대입. <a download="PaintJS"></a>.
  link.click(); // 해당 a태그를 자동으로 1회 클릭해줌.
};

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (canvas) {
  // 현재 웹페이지에 canvas가 존재하는 경우 실행.
  canvas.addEventListener("mousedown", startPainting); // mousedown: 마우스를 누르는 이벤트
  canvas.addEventListener("mousemove", onMouseMove); // mousemove: 마우스를 움직이는 이벤트
  canvas.addEventListener("mouseup", stopPainting); // mouseup: 마우스를 떼는 이벤트
  canvas.addEventListener("mouseleave", stopPainting); // mouseleave: 마우스가 캔버스를 떠나는
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu); // contextmenu : 우클릭하면 선택창이 나타나는 이벤트
}
