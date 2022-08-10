import User from "../model/user.js";
import { validationResult } from "express-validator";
export const loginPage = async (req, res, next) => {
  res.render("admin/login", {
    login: req.session.login,
    errors: false,
  });
};

export const postLogin = async (req, res, next) => {
  try {
    const email = req.body.email.trim();
    const pass = req.body.password;
    // let user = await User.findById("61d364275ee08b63043f4c0c");
    // if (!user) res.redirect("/");
    // else {
    //   req.session.login = true;
    //   req.session.user = user;
    //   console.log(email, pass);
    //   res.redirect(`/dashboard`);
    // }

    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(422).render("admin/login", {
        login: req.session.login,
        errors: error.array()[0].msg,
      });

    let person = await User.findOne({ email });
    if (pass === person?.pass) {
      req.session.login = true;
      req.session.user = person;
      return await req.session.save(() => res.redirect("/dashboard"));
    } else {
      req.session.pesan = true;
      res.redirect(`/`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const postLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
