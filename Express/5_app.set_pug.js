import express from "express";
import path from "path";
import { localVariables } from "./middleware";
import routes from "./routes";

const app = express();

// app의 views 엔진을 pug로 설정 & 렌더링할 파일들의 위치 설정(set)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// locals variable middleware : able to use inside the templates
app.use(localVariables);

// Controllers : render templates with pageTitle data
const home = (req, res) => res.render("home", { pageTitle: "Home" });
const login = (req, res) => res.render("login", { pageTitle: "Login" });
const photos = (req, res) => res.render("photos", { pageTitle: "Photos" });
const profile = (req, res) => res.render("profile", { pageTitle: "Profile" });

// use controllers
app.get(routes.home, home);
app.get(routes.login, login);
app.get(routes.photos, photos);
app.get(routes.profile, profile);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
