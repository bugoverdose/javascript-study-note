import { getMovieById, getMovies, addMovie } from "./db";

export const getAddMovie = (req, res) => res.render("add");
export const postAddMovie = async (req, res) => {
  const {
    body: { title, synopsis, genreString },
  } = req; // req.body: 각 input, textarea 등에 입력되어 form으로 전달(post)된 값들. 각 element의 name값에 대응됨.
  const genres = genreString.split(",");
  await addMovie({ title, synopsis, genres });
  return res.redirect("/");
};
