import express from "express";
import path from "path";
import { localVariables } from "./middleware";
import routes from "./routes";
import globalRouter from "./router";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// locals variable middleware : able to use inside the templates
app.use(localVariables);

// use Router
app.use(routes.home, globalRouter);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
