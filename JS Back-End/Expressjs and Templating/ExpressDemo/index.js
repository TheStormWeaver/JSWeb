const express = require("express");
const catalogRouter = require("./catalog.js")

const app = express();

app.use(catalogRouter)

app.get("/", (req, res) => {
  res.status(201);
  res.send("Hello, Express!");
});

app.get("/tos", (req, res) => {
  res.download("./demo.pdf")
  res.sendFile(__dirname + "./demo.pdf")
})

app.get("/contact", (req, res) => {
  res.redirect("/about")
})

app.get("/about", (req, res) => {
  res.send("About page")
})

app.listen(3030, () => console.log("Server listening on port 3030"));
