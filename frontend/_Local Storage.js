/*
localStorage.setItem("currentUser", "text");
- local storage의 "currentUser" key에 "text" value를 저장.
localStorage.getItem("currentUser")
- local storage의 "currentUser" key의 value 가져오기

주의: local storage에는 문자열 형식만 저장 가능.
- JSON.stringify(객체) : 문자열로 변환.
- JSON.parse(문자열) : 객체로 변환.
*/

const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const GREETING_LIST = [
  "Hey there,",
  "How's it going,",
  "Another beautiful day,",
  "Keep on going,",
  "Keep it up,",
];

const saveName = (text) => {
  localStorage.setItem(USER_LS, text);
};

const onUsernameSubmit = (event) => {
  event.preventDefault();
  const currentValue = input.value; // input태그에 입력하고 제출(Submit)한 내용 = input의 value값이 됨.
  paintGreeting(currentValue); // 제출된 value를 인자로 실행.
  saveName(currentValue);
};

const askForName = () => {
  form.classList.add(SHOWING_CN); // form(이름 입력칸)의 내용이 보이도록 class="showing" 추가
  form.addEventListener("submit", onUsernameSubmit);
};

const genRandom = () => {
  const randomInt = Math.floor(Math.random() * GREETING_LIST.length);
  return randomInt;
};

const randomGreeting = () => {
  const int = genRandom();
  return GREETING_LIST[int];
};

const paintGreeting = (text) => {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const greetingText = randomGreeting();
  greeting.innerText = `${greetingText} ${text}`;
};

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser); // User가 존재하는 경우
  }
};

const initGreeting = () => {
  loadName();
};

initGreeting();
