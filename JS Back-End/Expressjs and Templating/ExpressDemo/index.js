const express = require("express");
const catalogRouter = require("./catalog.js");
const fallback = require("./fallback.js");
const isAdmin = require("./guard.js");
const logger = require("./logger.js");

const app = express();

app.use(catalogRouter)
app.use(logger)

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
  throw new Error("Test error")
  // res.send("About page")
})

app.get("/admin", isAdmin, (req, res) => {
  res.send("Admin page")
})

app.use(fallback)

app.listen(3030, () => console.log("Server listening on port 3030"));
