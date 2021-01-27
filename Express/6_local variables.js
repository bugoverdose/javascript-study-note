/*
  res.locals.변수 : 앱 어디에서나 사용 가능한 변수 생성 방법.
                  - 모든 pug 템플릿에 동일한 내용 공통적으로 전달 가능.     
*/

import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// locals variable middleware : able to use inside the templates
const localVariables = (req, res, next) => {
  res.locals.siteName = "WeTube Challenge";
  next();
};

app.use(localVariables);

app.get("/", (req, res) => res.render("Home", { pageTitle: Home }));

app.listen(4000, () => console.log(`Listening!`));
