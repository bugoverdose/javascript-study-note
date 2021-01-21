import express from "express";

const app = express();

const consoleMiddleware = (req, res, next) => {
  console.log("I am a middleware");
  next();
};

const protectdMiddleware = (req, res, next) => {
  res.redirect("/");
};

app.use(consoleMiddleware);
app.get("/", (req, res) => res.send("Home"));
app.get("/about-us", (req, res) => res.send("About Us"));
app.get("/contact", (req, res) => res.send("Contact"));
app.get("/protected", protectdMiddleware);

app.listen(4000, () => console.log(`Listening!`));
