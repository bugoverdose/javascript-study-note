import express from "express";

const app = express();

// Controllers
export const getHome = (req, res) => res.send("Home");
export const getJoin = (req, res) => res.send("Join");
export const getLogin = (req, res) => res.send("Login");

export const getCourses = (req, res) => res.send("Courses");
export const getNew = (req, res) => res.send("New");
export const getMine = (req, res) => res.send("Mine");

// Create Routers
const homeRouter = express.Router();
homeRouter.get("/", getHome);
homeRouter.get("/join", getJoin);
homeRouter.get("/login", getLogin);

const coursesRouter = express.Router();
coursesRouter.get("/", getCourses);
coursesRouter.get("/new", getNew);
coursesRouter.get("/mine", getMine);

// Use Routers
app.use("/", homeRouter);
app.use("/courses", coursesRouter);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
