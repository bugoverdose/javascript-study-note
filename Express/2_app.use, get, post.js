/*
  Routes도 middleware의 일종.
  - "next"를 호출하는 대신 "res"를 통해 연결을 끝내는 기능. (ex. res.render)

  route에 대한 동작 방식 비교.  
  - app.get : GET 요청에 대해서만 호출
  - app.post : POST 요청에 대해서만 호출
  - app.use : 모든 요청에 대해 호출
*/

// 첫번째 인자가 route일 때 작동방식 비교.
// use 메서드: 요청 주소만 일치하면 실행. (모든 HTTP 메서드에 대해 실행) => middleware로 활용 가능.
app.use("/", function (req, res, next) {
  console.log("/ 주소의 요청이면 무조건 실행.");
  next();
});

// get, post, put, patch, delete 메서드: 요청 주소와 HTTP 메서드가 모두 일치할 때만 실행.
app.get("/", function (req, res, next) {
  console.log("GET 메서드 + / 주소의 요청일 때만 실행.");
  next();
});
app.post("/data", function (req, res, next) {
  console.log("POST 메서드 + /data 주소의 요청일 때만 실행.");
  next();
});
