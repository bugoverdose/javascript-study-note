export const localVariables = (req, res, next) => {
  res.locals.siteName = "WeTube Challenge";
  next();
};
