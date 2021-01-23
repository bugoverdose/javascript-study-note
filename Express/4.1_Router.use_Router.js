/*
  Router.use(route, Router)
  * apiRouter.use("/v1", v1Router);
  * app.use("/api", apiRouter);

  / - /                   : /
    - /join               : /join
    - /login              : /login
  /api - /documentation   : /api/documentation
       - /v1 - /buy       : /v1/buy
             - /refund    : /v1/refund
       - /v2 - /remove    : /v2/remove
             - /edit      : /v2/edit

  cf) https://gist.github.com/zcaceres/f38b208a492e4dcd45f487638eff716c
*/
import express from "express";

const app = express();

// Controllers
export const getHome = (req, res) => res.send("Home");
export const getJoin = (req, res) => res.send("Join");
export const getLogin = (req, res) => res.send("Login");

export const getDocumentation = (req, res) => res.send("Documentation");
export const getBuy = (req, res) => res.send("Buy");
export const getRefund = (req, res) => res.send("Refund");
export const getRemove = (req, res) => res.send("Remove");
export const getEdit = (req, res) => res.send("Edit");

// Create Routers
const homeRouter = express.Router();
homeRouter.get("/", getHome);
homeRouter.get("/join", getJoin);
homeRouter.get("/login", getLogin);

const v1Router = express.Router();
v1Router.get("/buy", getBuy);
v1Router.get("/refund", getRefund);

const v2Router = express.Router();
v2Router.get("/remove", getRemove);
v2Router.get("/edit", getEdit);

const apiRouter = express.Router();
apiRouter.get("/documentation", getDocumentation);
apiRouter.use("/v1", v1Router);
apiRouter.use("/v2", v2Router);

// Use Routers
app.use("/", homeRouter);
app.use("/api", apiRouter);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
