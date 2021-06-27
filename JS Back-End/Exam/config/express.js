const hbs = require("express-handlebars");
const express = require("express");
const cookieParser = require("cookie-parser");

const authMiddlewareService = require("../middlewares/auth");
const storageMiddlewareService = require("../middlewares/storage");

module.exports = (app) => {
  app.engine(
    "hbs",
    hbs({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(authMiddlewareService());
  app.use(storageMiddlewareService());

  app.use((req, res, next) => {
    if (!req.url.includes("favicon")) {
      console.log(">>>", req.method, req.url);

      if (req.user) {
        console.log("Known user", req.user.email);
      }
    }
    next();
  });
};