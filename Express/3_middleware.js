/* 
  app.use(<MIDDLEWARE>) : 모든 route들에 middleware 적용.

  cf) res.end() : middleware 내에서 연결을 끝내는 방법.
*/

import express from "express";

const app = express();

const consoleMiddleware = (req, res, next) => {
  console.log("I am a middleware");
  next();
};

const protectedMiddleware = (req, res, next) => {
  res.redirect("/");
};

app.use(consoleMiddleware);
app.get("/", (req, res) => res.send("Home"));
app.get("/about-us", (req, res) => res.send("About Us"));
app.get("/contact", (req, res) => res.send("Contact"));
app.get("/protected", protectedMiddleware, (req, res) => res.send("Protected"));

app.listen(4000, () => console.log(`Listening!`));
