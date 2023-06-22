require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const indexRouter = require("./routes/index");
const { auth } = require("express-openid-connect");

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

app.set("views", "views");
app.set("view engine", "ejs");
// app.use(express.static(__dirname 'public'))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
// auth0 router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// Sanitize against NoSQL query injection
app.use(mongoSanitize());
// Sanitize against Cross=site Scripting Attack XXS
app.use(xss());
// Secure HTTP header
app.use(helmet());

app.use("/", indexRouter);

app.listen(process.env.PORT || 9999, console.log("App running on port 9999"));
