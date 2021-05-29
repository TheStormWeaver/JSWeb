const express = require("express");
const hbs = require("express-handlebars");

const app = express();

app.engine(
  "handlebars",
  hbs({
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  const data = {
    user: {
      username: "Peter",
    },
    title: "Home Page",
    name: "Peter",
    age: 24,
    items: [
      {
        type: "Lint",
        qty: 5,
      },
      {
        type: "Wallet",
        qty: 1,
      },
      {
        type: "Bubblegum",
        qty: 10,
      },
      {
        type: "Coins",
        qty: 3.5,
      },
    ],
  };
  res.render("home.hbs", data);
});

app.listen(3030);

