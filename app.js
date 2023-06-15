require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const indexRouter = require("./routes/index");

app.set("views", "views");
app.set("view engine", "ejs");

// app.use(express.static(__dirname 'public'))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Sanitize against NoSQL query injection
app.use(mongoSanitize())

// Sanitize against Cross=site Scripting Attack XXS
app.use(xss())

// Secure HTTP header
app.use(helmet());

app.use("/", indexRouter);

app.listen(process.env.PORT || 9999, console.log("App running on port 9999"));
