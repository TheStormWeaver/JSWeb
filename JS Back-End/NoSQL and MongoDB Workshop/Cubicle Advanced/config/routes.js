const { about } = require("../controllers/about")
const { catalog } = require("../controllers/catalog")
const { create, createPost } = require("../controllers/create")
const { details, attach, attachPost } = require("../controllers/details")
const { edit, editPost } = require("../controllers/edit")
const { notFound } = require("../controllers/notFound")
const { post: commentsPost } = require("../controllers/comments")
const { createAccessory, accessoryPost } = require("../controllers/accessory")

module.exports = (app) => {
  app.get("/", catalog);

  app.get("/about", about);

  app.get("/details/:id", details);

  app.get("/create", create);
  app.post("/create", createPost);

  app.get("/edit/:id", edit);
  app.post("/edit/:id", editPost);

  app.post("/comments/:cubeId/create", commentsPost)

  app.get("/accessory/create", createAccessory)
  app.post("/accessory/create", accessoryPost)
  app.get("/details/:id/attach", attach)
  app.post("/details/:cubeId/attach", attachPost)

  app.all("*", notFound);
};
