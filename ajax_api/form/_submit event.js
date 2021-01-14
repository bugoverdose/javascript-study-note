/*
[videoDetail.pug]
form.add__comment#jsAddComment
    input(type="text", placeholder="Add a comment")
*/
const addCommentForm = document.getElementById("jsAddComment");

const sendComment = (comment) => {
  console.log(comment); // input으로 submit받은 값에 대한 작업
};

const handleSubmit = (event) => {
  event.preventDefault(); // 새로고침되지 않도록. (form의 디폴트 이벤트 발생하지 않도록)
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = ""; // 다시 input은 빈 공간으로
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
  // form에 대해 submit하는 이벤트가 발생했을 때 콜백함수 실행.
};

if (addCommentForm) {
  init();
}
