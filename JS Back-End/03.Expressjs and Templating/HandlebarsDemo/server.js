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

app.get("/catalog", (req, res) => [
  res.render("catalog", {
    products: [
      {
        type: "Washer",
        qty: 45
      },
      {
        type: "Bolt 3/8",
        qty: 118
      },
    ]
  })
])

app.listen(3030);
