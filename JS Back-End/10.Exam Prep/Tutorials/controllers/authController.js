const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest(), (req, res) => {
  res.render("user/register");
});

router.post(
  "/register",
  isGuest(),
  body("username")
  .isLength({ min: 5 })
  .withMessage("Username must be at least 5 characters long")
  .bail()
  .isAlphanumeric()
  .withMessage("Username may contain only english letters and digits"),
body("password")
  .isLength({ min: 5 })
  .withMessage("Password must be at least 5 characters long")
  .bail()
  .isAlphanumeric()
  .withMessage("Password may contain only english letters and digits"),
body("rePassword").custom((value, { req }) => { //change the name of rePass if necessary
  if (value != req.body.password) {
    throw new Error("Passswords don't match");
  }
  return true;
}),
  async (req, res) => {
    const { errors } = validationResult(req);

    try {
      if (errors.length > 0) {
        console.log(errors)
        throw new Error(Object.values(errors).map(e => e.msg).join("\n"));
      }

      await req.auth.register(req.body.username, req.body.password);
      res.redirect("/");
    } catch (err) {
      const ctx = {
        errors: err.message.split("\n"),
        userData: {
          username: req.body.username,
        },
      };
      res.render("user/register", ctx);
    }
  }
);

router.get("/login", isGuest(), (req, res) => {
  res.render("user/login");
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    await req.auth.login(req.body.username, req.body.password);
    res.redirect("/");
  } catch (err) {
    console.log(err.message)
    let errors = [err.message]
    if(err.type == "credentail"){
      errors = ["Incorrect username or password"]
    }
    const ctx = {
      errors,
      userData: {
        username: req.body.username,
      },
    };
    res.render("user/login", ctx);
  }
});

router.get("/logout", (req, res) => {
  req.auth.logout()
  res.redirect("/")
})

module.exports = router;