const express = require("express")
const hbs = require("express-handlebars")

const app = express()

app.engine("handlebars", hbs({
  partialsDir: "./views",
  extname: ".hbs"
}))

app.use("view engine", ".hbs")

app.get("/", (req, res) => {
  // res.send("Its Working")
  res.render("home.hbs")
})

app.listen(3030)