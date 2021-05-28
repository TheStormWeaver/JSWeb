const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(201);
  res.send("Hello, Express!");
});

app
  .route("/catalog")
  .post((req, res) => {
    res.send("Article Created");
  })
  .get((req, res) => {
    res.send("Catalog Page");
  });

app.all("*", (req, res) => {
  res.send("Matching all methods" + req.method);
});

app.listen(3030, () => console.log("Server listening on port 3030"));
