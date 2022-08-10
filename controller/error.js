export const error = (req, res, next) => {
  res.render(`error/error404`, {
    docTitle: `Error Page`,
    path: "",
    login: req.session.login,
  });
};
