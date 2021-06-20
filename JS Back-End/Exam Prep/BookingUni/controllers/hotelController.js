const router = require("express").Router();

const { isUser, isOwner } = require("../middlewares/guards");
const { preloadHotel } = require("../middlewares/preload");

router.get("/create", isUser(), (req, res) => {
  res.render("hotel/create");
});

router.post("/create", isUser(), async (req, res) => {
  const hotelData = {
    name: req.body.name,
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    rooms: req.body.rooms,
    bookedBy: [],
    owner: req.user._id,
  };

  try {
    await req.storage.createHotel(hotelData);

    res.redirect("/");
  } catch (err) {
    let errors;
    if (err.errors) {
      errors = Object.values(err.errors).map((e) => e.properties.message);
    } else {
      errors = [err.message];
    }

    const ctx = {
      errors: errors,
      hotelData: {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        bookedBy: [],
        owner: req.user._id,
      },
    };
    res.render("hotel/create", ctx);
  }
});

router.get("/:id", preloadHotel(), async (req, res) => {
  const hotelData = req.data.hotel;
  const ctx = {
    hotelData,
    isOwner,
  };
  res.render("hotel/details", ctx);
});

router.get("/edit/:id", preloadHotel(), async (req, res) => {
  const hotelData = req.data.hotel;
  console.log(hotelData)
  const ctx = {
    hotelData,
  };
  res.render("hotel/edit", ctx);
});

router.post("/edit/:id", preloadHotel(), async (req, res) => {
  const hotelData = {
    name: req.body.name,
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    rooms: req.body.rooms,
  };
  console.log(hotelData)
  try {
    await req.storage.editHotel(req.params.id, hotelData);
    res.redirect("/");
  } catch (err) {
    console.log(err.message)
    res.redirect("/");
  }
});

module.exports = router;
