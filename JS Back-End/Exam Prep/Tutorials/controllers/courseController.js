const router = require("express").Router();

const { isUser } = require("../middlewares/guards");

router.get("/create", isUser(), (req, res) => {
  res.render("course/create");
});

router.post("/create", isUser(), async (req, res) => {
  const courseData = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    duration: req.body.duration,
    createdAt: new Date(),
    usersInCourses: [],
    author: req.user._id,
  };

  try {
    await req.storage.createCourse(courseData);

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
      courseData: {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
      },
    };
    res.render("course/create", ctx);
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const courseData = await req.storage.getCourseById(req.params.id);

    courseData.isAuthor = req.user && req.user._id == courseData.author;
    courseData.enrolled = req.user && courseData.usersInCourses.find(u => u._id == req.user._id);

    res.render("course/details", { courseData }); 
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.get("/edit/:id", isUser(), async (req, res) => {
  try {
    const course = await req.storage.getCourseById(req.params.id);

    if (req.user._id != course.author) {
      throw new Error("Cannot edit a course that you have not created!");
    }

    res.render("course/edit", { courseData: course });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.post("/edit/:id", isUser(), async (req, res) => {
  try {
    const course = await req.storage.getCourseById(req.params.id);

    if (req.user._id != course.author) {
      throw new Error("Cannot edit a course that you have not created!");
    }

    await req.storage.editCourse(req.params.id, req.body);

    res.redirect("/course/details/" + req.params.id);
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
      courseData: {
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
      },
    };
    res.render("course/edit", ctx);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const course = await req.storage.getCourseById(req.params.id);

    if (req.user._id != course.author) {
      throw new Error("Cannot delete a course that you have not created!");
    }

    await req.storage.deleteCourse(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.get("/enroll/:id", isUser(), async (req, res) => {
  try {
    const course = await req.storage.getCourseById(req.params.id);

    if (course.author == req.user._id) {
      throw new Error("Cannot enroll in your own course!");
    }

    await req.storage.enrollInCourse(req.params.id, req.user._id);
    res.redirect("/course/details/" + req.params.id);
  } catch (err) {
    console.log(err.message)
    res.redirect("/play/details/" + req.params.id)
  }
});

module.exports = router;