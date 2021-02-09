/*
  File System
  - fs.readdir : 특정 폴더의 모든 파일명들의 배열을 files에 저장
  - fs.readFile : 특정 파일의 내용을 data에 저장

  cf) https://nodejs.org/api/fs.html
*/
// Express의 11_multer 참고: [controller.js]
import fs from "fs";

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "TXT2HTML" });

export const postUpload = (req, res) => {
  console.log(req.file); // multer 미들웨어 없으면 undefined 출력
  fs.readdir(req.file.destination, (err, files) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(files); // files : textFile 폴더의 모든 파일명들의 배열
  });

  fs.readFile(req.file.path, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(data); // data : textFile 폴더의 해당 파일의 내용
    res.render("read", { pageTitle: "read", content: data });
  });
};
