// img 태그 생성자 함수
// <img src="images/1.jpg" class="bgImage">

const body = document.querySelector("body");

const IMG_NUMBER = 8;

const paintImage = (imgNum) => {
  const image = new Image(); // <img>
  image.src = `images/${imgNum}.jpg`; // <img src="images/1.jpg">
  image.classList.add("bgImage"); // <img src="images/1.jpg" class="bgImage">
  // image.addEventListener("loadend", handleImgLoad) // API로 원격으로 하는 경우에 필요.
  body.appendChild(image); // body.prepend(image)로 뒤로 보내기
};

const genRandom = () => {
  const number = Math.ceil(Math.random() * 7);
  return number;
};

const initBackgroundImg = () => {
  const randomNumber = genRandom();
  paintImage(randomNumber);
};

initBackgroundImg();
