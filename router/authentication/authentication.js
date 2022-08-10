import express from "express";
import * as controller from "../../controller/autentifikasi.js";
import { check, body } from "express-validator";
const routerAutentikasi = express.Router();

routerAutentikasi.get("/", controller.loginPage);

routerAutentikasi.post(
  "/login-post",
  [
    body("email", "Masukan Email Dengan Format Yang Benar")
      .toLowerCase()
      .isEmail()
      .trim(),
  ],
  controller.postLogin
);
routerAutentikasi.post("/logut", controller.postLogout);
export default routerAutentikasi;
