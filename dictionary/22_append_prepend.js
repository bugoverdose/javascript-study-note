/*
  append : 리스트의 맨 끝에 추가. 배열 메서드 push와 동일
  prepend : 리스트의 맨 앞에 추가.
*/
const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li); // 맨 처음에 추가. append는 맨 끝에 추가.
};
