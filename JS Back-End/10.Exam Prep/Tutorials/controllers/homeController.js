const router = require("express").Router();

router.get("/", async (req, res) => {
  const courses = await req.storage.getAllCourses();
  if (req.user) {
    res.render("home/home", { courses });
  } else {
    res.render("home/guest", { courses });
  }
});

module.exports = router;
