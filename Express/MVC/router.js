import express from "express";
import routes from "./routes";
import { getHome, getLogin, getPhotos, getProfile } from "./controllers";

const globalRouter = express.Router();

// yse Controllers
globalRouter.get(routes.home, getHome);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.photos, getPhotos);
globalRouter.get(routes.profile, getProfile);

export default globalRouter;
