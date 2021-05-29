const express = require("express")
const hbs = require("express-handlebars")

const app = express()

app.engine("handlebars", hbs({
  extname: ".hbs"
}))

app.set("view engine", ".hbs")

app.get("/", (req, res) => {
  const data = {
    name: "Peter",
    age: 24,
    items: ["Lint", "Wallet", "Bubblegum", "Coins"]
  }
  res.render("home.hbs", data)
})

app.listen(3030)
