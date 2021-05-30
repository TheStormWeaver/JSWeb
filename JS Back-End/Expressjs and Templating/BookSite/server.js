const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser").urlencoded({
  extended: true
});

const storage = require("./util/storage.js");
const home = require("./controllers/home.js");
const catalog = require("./controllers/catalog.js");

async function start() {
  const port = 3020;
  const app = express();

  app.use(bodyParser);
  app.use("/static", express.static("static"));

  app.engine(
    "hbs",
    hbs({
      extname: ".hbs",
    })
  );

  app.set("view engine", ".hbs");

  app.use(await storage());

  app.get("/", home);

  app.use("/catalog", catalog);

  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

start();
