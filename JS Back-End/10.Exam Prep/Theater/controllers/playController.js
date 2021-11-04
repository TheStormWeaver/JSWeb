const router = require("express").Router();

const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util/parsers");

router.get("/create", isUser(), (req, res) => {
  res.render("play/create");
});

router.post("/create", isUser(), async (req, res) => {
  const playData = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    public: Boolean(req.body.public),
    createdAt: new Date(),
    usersLiked: [],
    author: req.user._id,
  };

  try {
    await req.storage.createPlay(playData);

    res.redirect("/");
  } catch (err) {
    let errors;
    if (err.errors) {
      errors = Object.values(err.errors).map((e) => e.properties.message);
    } else {
      errors = [err.message];
    }

    const ctx = {
      errors,
      playData: {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        public: req.body.public,
      },
    };
    res.render("play/create", ctx);
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const playData = await req.storage.getPlayById(req.params.id);

    playData.hasUser = Boolean(req.user);
    playData.isAuthor = req.user && req.user._id == playData.author;
    playData.liked = req.user && playData.usersLiked.find(u => u._id == req.user._id);

    res.render("play/details", { playData });
  } catch (err) {
    console.log(err.message);
    res.redirect("/play/details/" + req.params.id);
  }
});

router.get("/edit/:id", isUser(), async (req, res) => {
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (req.user._id != play.author) {
      throw new Error("Cannot edit play you have not created!");
    }

    res.render("play/edit", { playData: play });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.post("/edit/:id", isUser(), async (req, res) => {
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (req.user._id != play.author) {
      throw new Error("Cannot edit a play you have not created!");
    }

    await req.storage.editPlay(req.params.id, req.body);

    res.redirect("/");
  } catch (err) {
    console.log(err.message);

    let errors;
    if (err.errors) {
      errors = Object.values(err.errors).map((e) => e.properties.message);
    } else {
      errors = [err.message];
    }

    const ctx = {
      errors,
      playData: {
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        public: Boolean(req.body.public),
      },
    };
    res.render("play/edit", ctx);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (play.author != req.user._id) {
      throw new Error("Cannot delete a play you have not created!");
    }

    await req.storage.deletePlay(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.get("/like/:id", isUser(), async (req, res) => {
  try {
    const play = await req.storage.getPlayById(req.params.id);

    if (play.author == req.user._id) {
      throw new Error("Cannot like your own play");
    }

    await req.storage.likePlay(req.params.id, req.user._id);
    res.redirect("/play/details/" + req.params.id);
  } catch (err) {
    console.log(err.message)
    res.redirect("/play/details/" + req.params.id)
  }
});

module.exports = router;
