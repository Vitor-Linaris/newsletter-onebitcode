const express = require("express");
const path = require("node:path");

const app = express();

let storedEmail = [];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", (req, res) => {
  const { email } = req.body;

  if (email) {
    storedEmail.push(email);
    res.redirect("/success");
  } else {
    res.redirect("/");
  }
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/list", (req, res) => {
  res.render("listEmails", { emails: storedEmail });
});

app.post("/list/delete", (req, res) => {
  const { email } = req.body;
  storedEmail = storedEmail.filter((item) => item !== email);
  res.redirect("/list");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
