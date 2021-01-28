export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Nomad Movies";
  next();
};
