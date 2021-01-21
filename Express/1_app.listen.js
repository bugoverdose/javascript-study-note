// app.js
import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Home"));

export default app;

//---------------------------------------------------------------------
// init.js
import dotenv from "dotenv";
import app from "./app";
dotenv.config(); // .env 파일의 환경변수 사용. init.js에서 한번만 실행해놓으면 다른 파일들에서 실행할 필요X.

const PORT = process.env.PORT || 4000; // PORT에 해당하는 값이 없다면 4000을 값으로 사용.

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
