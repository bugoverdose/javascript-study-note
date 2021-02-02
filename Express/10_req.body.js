/*
  req.body
  - form으로 전달(post)받은 데이터들. 
  - req.body.name은 input, textarea 등 각 element의 name 속성값에 대응됨.
*/

import { addMovie } from "./db";

export const getAddMovie = (req, res) => res.render("add");
export const postAddMovie = async (req, res) => {
  const {
    body: { title, synopsis, genreString },
  } = req;
  const genres = genreString.split(",");
  await addMovie({ title, synopsis, genres });
  return res.redirect("/");
};
