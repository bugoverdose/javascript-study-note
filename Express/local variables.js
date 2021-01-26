/*
  res.locals.변수 : 앱 어디에서나 사용 가능한 변수 생성 방법.
*/

import express from "express";

const app = express();

// locals variable middleware : able to use inside the templates
const localVariables = (req, res, next) => {
  res.locals.siteName = "WeTube Challenge";
  next();
};

app.use(localVariables);

app.get("/", (req, res) => res.send("Home"));

app.listen(4000, () => console.log(`Listening!`));
