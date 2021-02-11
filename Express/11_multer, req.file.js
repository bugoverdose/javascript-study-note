/*
multer 
- file의 URL을 반환해주는 middleware. 주소 형식으로 파일에 접근가능해짐.
- req.file에 form으로 submit된 파일의 정보를 담아줌 + 해당 파일 업로드해줌.
*/
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

// Add your magic here!
const upload = multer({ dest: "txt" });

app.get("/", (req, res) => res.render("index"));
app.post("/read", upload.single("file"), async (req, res) => {
  const {
    file: { path },
  } = req;
  fs.readFile(path, "utf8", (err, data) => {
    res.render("result", { contents: data });
  });
});
// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));
