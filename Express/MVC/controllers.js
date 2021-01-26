// Controllers : render templates with pageTitle data
export const getHome = (req, res) => res.render("home", { pageTitle: "Home" });
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const getPhotos = (req, res) =>
  res.render("photos", { pageTitle: "Photos" });
export const getProfile = (req, res) =>
  res.render("profile", { pageTitle: "Profile" });
