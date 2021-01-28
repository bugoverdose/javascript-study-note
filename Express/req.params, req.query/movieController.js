import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
} from "./db";

export const home = async (req, res) => {
  const movies = await getMovies().map((movie) => {
    return { id: movie.id, title: movie.title };
  });
  res.render("movies", { pageTitle: "Movies!", movies });
};

export const movieDetail = async (req, res) => {
  const {
    params: { id }, // '/:id' 라우트의 id 변수값
  } = req;
  try {
    const { title, summary, genres } = await getMovieById(id);
    res.render("detail", { pageTitle: title, title, summary, genres });
  } catch (error) {
    res.render("404");
  }
};

export const filterMovie = async (req, res) => {
  const { query } = req; // `/route?ABC=123` => req.query == {ABC: "123"}
  try {
    if (query.year) {
      const movies = await getMovieByMinimumYear(parseInt(query.year, 10)).map(
        (movie) => {
          return { id: movie.id, title: movie.title };
        }
      );
      res.render("movies", {
        pageTitle: `Searching by year: ${query.year}`,
        movies,
      });
    } else if (query.rating) {
      const movies = await getMovieByMinimumRating(
        parseInt(query.rating, 10)
      ).map((movie) => {
        return { id: movie.id, title: movie.title };
      });
      res.render("movies", {
        pageTitle: `Searching by rating: ${query.rating}`,
        movies,
      });
    } else {
      throw Error();
    }
  } catch (error) {
    res.render("404");
  }
};
