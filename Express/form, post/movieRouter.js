import express from "express";
import {
  home,
  movieDetail,
  getAddMovie,
  postAddMovie,
} from "./movieController";

const movieRouter = express.Router();

movieRouter.get("/", home);
/*
Here add a way to handle GET and POST requests to the "/add" URL
Make sure is ABOVE /:id or it WON'T work.
*/
movieRouter.get("/add", getAddMovie);
movieRouter.post("/add", postAddMovie);

movieRouter.get("/:id", movieDetail); // 주의: /add를 id=add로 간주하게 됨.

export default movieRouter;
