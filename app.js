const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

app.engine(
  "hbs",
  expressHbs({ layoutsDir: "views/layouts", defaultLayout: "main.hbs" })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

const users = new Array();

app.get("/", (req, res, next) => {
  res.render("user-form", {
    pageTitle: "User input",
    inputLabel: "Input user name",
    buttonLabel: "Add user",
  });
});

app.get("/users", (req, res, next) => {
  res.render("users-list", { areUsers: users.length > 0, users: users });
});

app.post("/add-user", (req, res, next) => {
  users.push({ userName: req.body.username });
  res.redirect("/users");
});

app.listen(3000);
