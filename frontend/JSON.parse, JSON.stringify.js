/*
JSON.stringify : JSON 객체 => 문자열로 변환.
JSON.parse : JSON 문자열=>다시 객체로 변환.
*/

const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const GREETINGS_LS = "greetings-list";
let GREETING_LIST = [];
const DEFAULT_GREETING_LIST = [
  { text: "Keep it up,", id: 1 },
  { text: "Hey there,", id: 2 },
  { text: "How's it going,", id: 3 },
  { text: "Another beautiful day,", id: 4 },
  { text: "Keep on going,", id: 5 },
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

const loadGreetingList = () => {
  const currentList = localStorage.getItem(GREETINGS_LS);

  if (currentList === null) {
    localStorage.setItem(GREETINGS_LS, JSON.stringify(DEFAULT_GREETING_LIST));
    GREETING_LIST = GREETINGS_LS;
  } else {
    GREETING_LIST = currentList;
  }
};

const randomGreeting = () => {
  const parsedGreetingsList = JSON.parse(GREETING_LIST);
  const randomInt = Math.floor(Math.random() * parsedGreetingsList.length);
  const selectedGreeting = parsedGreetingsList[randomInt.toString()];
  const parsedGreeting = selectedGreeting.text;
  return parsedGreeting;
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
  loadGreetingList();
  loadName();
};

initGreeting();
