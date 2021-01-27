// Controllers : render templates with pageTitle data
export const getHome = (req, res) => res.render("page", { pageTitle: "Home" });
export const getLogin = (req, res) =>
  res.render("page", { pageTitle: "Login" });
export const getPhotos = (req, res) =>
  res.render("page", { pageTitle: "Photos" });
export const getProfile = (req, res) =>
  res.render("page", { pageTitle: "Profile" });
