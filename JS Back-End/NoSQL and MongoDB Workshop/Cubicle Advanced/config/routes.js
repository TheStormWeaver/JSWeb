const { about } = require("../controllers/about")
const { catalog } = require("../controllers/catalog")
const { create, createPost } = require("../controllers/create")
const { details } = require("../controllers/details")
const { edit, editPost } = require("../controllers/edit")
const { notFound } = require("../controllers/notFound")
const { post: commentsPost } = require("../controllers/comments")

module.exports = (app) => {
  app.get("/", catalog);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.get("/create", create);
  app.post("/create", createPost);

  app.get("/edit/:id", edit);
  app.post("/edit/:id", editPost);
  app.post("/comments/:cubeId/create", commentsPost)

  app.all("*", notFound);
};
