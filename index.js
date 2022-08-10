import express from "express";
import routerAdmin from "./router/admin/adminRouter.js";
import routerCustomer from "./router/customer/customerRouter.js";
import session from "express-session";
import path from "path";
import User from "./model/user.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routerError from "./router/error/error.js";
import connectMongodbSession from "connect-mongodb-session";
import routerAutentikasi from "./router/authentication/authentication.js";
import csurf from "csurf";
const app = express();
const port = 8000;
const __dirname = path.resolve();
const urlDatabase = `mongodb+srv://runatyudi:kawasanrokok1998@cluster0.oaqmd.mongodb.net/appKP?retryWrites=true&w=majority`;
const MongoDBStore = connectMongodbSession(session);

const store = new MongoDBStore({
  uri: urlDatabase,
  collection: "session",
});
const protekCsrf = csurf();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: `rahasia`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: null },
    store: store,
  })
);

app.use(protekCsrf);

app.use(async (req, res, next) => {
  try {
    if (!req.session.user) return next();
    let user = await User.findById(req.session.user._id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.pesan = req.session.pesan;
  delete req.session.pesan;
  next();
});

app.use(routerAutentikasi);
app.use(routerAdmin);
app.use(routerAdmin);
app.use("/customer", routerCustomer);
app.use(routerError);
mongoose.connect(urlDatabase).then((result) => {
  User.findOne().then((data) => {
    if (!data) {
      const user = new User({
        nama: `Lords Tailor`,
        email: `lordstailorjkt@gmail.com`,
        pass: "lordstailor1234",
      });
      user.save();
    }
  });
  app.listen(port, () => console.log(`konek`));
});
