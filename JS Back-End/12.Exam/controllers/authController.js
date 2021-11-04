const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest(), (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  isGuest(),
  body("email").isEmail().withMessage("Email must be valid!"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long!"),
  body("rePassword").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passswords don't match");
    }
    return true;
  }),
  async (req, res) => {
    const { errors } = validationResult(req);

    try {
      if (errors.length > 0) {
        const message = errors.map((e) => e.msg).join("\n");
        throw new Error(message);
      }

      await req.auth.register(req.body.email, req.body.password);
      res.redirect("/");
    } catch (err) {
      const ctx = {
        errors: err.message.split("\n"),
        userData: {
          email: req.body.email,
        },
      };
      res.render("register", ctx);
    }
  }
);

router.get("/login", isGuest(), (req, res) => {
  res.render("login");
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    await req.auth.login(req.body.email, req.body.password);
    res.redirect("/");
  } catch (err) {
    const ctx = {
      errors: [err.message],
      userData: {
        email: req.body.email,
      },
    };
    res.render("login", ctx);
  }
});

router.get("/logout", (req, res) => {
  req.auth.logout();
  res.redirect("/");
});

module.exports = router;
