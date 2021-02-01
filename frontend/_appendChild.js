/*
const list = document.createElement("li"); // html 코드 <li> element를 생성.
const span = document.createElement("span");
span.innerText = `${text} `; // 버튼 사이에 공백 추가 // 매개변수 text에 입력된 인자값(=input에 submit되는 내용)을 span 태그에 추가.
list.appendChild(span); // li 태그 내부에 자식 태그로써 span 태그 추가.
*/
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let idNumbers = 1;
let toDos = []; // 새로운 배열 cleanToDos를 대입할 수 있도록 const가 아니라 let으로 변경.

const deleteToDo = (event) => {
  const btn = event.target; // 클릭한 버튼 자기 자신
  const li = btn.parentNode; // console.dir로 확인된 클릭된 버튼의 부모태그.
  toDoList.removeChild(li); // <ul class="js-toDoList"></ul>에 대해 자식태그 <li>~</li>를 삭제.
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== parseInt(li.id); // toDos배열 내부의 모든 요소들에 대해 함수를 실행하여 true라고 반환되는 요소들만 반환
  });
  toDos = cleanToDos; // 기존 toDos 배열에서 특정 요소를 제거하는 것이 아니라, 버튼을 누르지 않은 요소들만으로 새로운 배열 생성하여 대체.
  saveToDos();
};

const saveToDos = () => {
  // 추가한 todo task 관련 정보를 local storage에 저장.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // local storage에는 문자열 형식만 저장 가능. 객체를 문자열로 변환해주는 기능.
};

const paintToDo = (text) => {
  const list = document.createElement("li"); // html 코드 <li> element를 생성.
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;
  delBtn.innerHTML = "❌"; // 버튼에 들어가는 내용.
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = `${text} `; // 버튼 사이에 공백 추가 // 매개변수 text에 입력된 인자값(=input에 submit되는 내용)을 span 태그에 추가.
  list.appendChild(span); // li 태그 내부에 자식 태그로써 span 태그 & button 태그 추가.
  list.appendChild(delBtn);
  list.id = newId;
  toDoList.appendChild(list); // 완성된 html 코드를 <ul class="js-toDoList"></ul>의 자식태그로써 index.html 파일에 추가
  const toDoObj = {
    text: text, // 매개변수 text에 입력된 인자값(=input에 submit되는 내용)
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
};

const onToDoSubmit = (event) => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // clear 기능: submit을 하면 입력한 내용이 사라지도록
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS); // 이미 todo task를 추가한 경우 local storage에 저장됨.
  if (loadedToDos !== null) {
    // local storage에 저장된 todo가 있으면 새로고침 했을 때 화면에 출력되도록.
    const parsedToDos = JSON.parse(loadedToDos); // 문자열 형식으로 저장된 todo를 객체로 변환하여 저장
    parsedToDos.forEach((toDo) => {
      // 객체의 각 요소에 대해 함수 실행.
      paintToDo(toDo.text); //text(=input에 submit되는 내용)
    });
  }
};

const initToDos = () => {
  loadToDos();
  toDoForm.addEventListener("submit", onToDoSubmit);
};

initToDos();
