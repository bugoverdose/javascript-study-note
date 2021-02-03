/*
  req.body
  - form으로 전달(post)받은 데이터들. 
  - req.body.name은 input, textarea 등 각 element의 name 속성값에 대응됨.

  req.method : 해당 컨트롤러로 현재 들어온 요청이 어떤 메서드인가.
*/
export const getAddMovie = (req, res) => res.render("add");
export const postAddMovie = async (req, res) => {
  const {
    body: { title, synopsis, genreString },
  } = req;
  const genres = genreString.split(",");
  await addMovie({ title, synopsis, genres });
  return res.redirect("/");
};

const movieRouter = express.Router();
movieRouter.get("/add", getAddMovie);
movieRouter.post("/add", postAddMovie);

// ==========================================
// sexy code. 동일 기능
export const add = (req, res) => {
  if (req.method === "GET") {
    return res.render("add", { pageTitle: "Add Movie" });
  } else if (req.method === "POST") {
    const {
      body: { title, genres, synopsis },
    } = req;
    addMovie({ title, synopsis, genres: genres.split(",") });
    return res.redirect("/");
  }
};

const movieRouter = express.Router();
movieRouter.route("/add").get(add).post(add);
