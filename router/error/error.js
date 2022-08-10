import express from "express";
import * as controller from "../../controller/error.js";
const routerError = express.Router();
import * as auth from "../../middleware/auth.js";
routerError.use(auth.data, controller.error);

export default routerError;
