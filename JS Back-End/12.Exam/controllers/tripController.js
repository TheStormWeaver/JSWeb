const router = require("express").Router();

const { isUser } = require("../middlewares/guards");

router.get("/trips", async (req, res) => {
  const trips = await req.storage.getAllTrips();

  res.render("shared-trips", { trips });
});

router.get("/create", isUser(), (req, res) => {
  res.render("trip-create");
});

router.post("/create", isUser(), async (req, res) => {
  const tripData = {
    startPoint: req.body.startPoint,
    endPoint: req.body.endPoint,
    date: req.body.date,
    time: req.body.time,
    imageUrl: req.body.imageUrl,
    brand: req.body.brand,
    seats: req.body.seats,
    price: req.body.price,
    description: req.body.description,
    creator: req.user._id,
    buddies: [],
  };

  try {
    await req.storage.createTrip(tripData);

    res.redirect("/trip/trips");
  } catch (err) {
    let errors;
    if (err.errors) {
      errors = Object.values(err.errors).map((e) => e.properties.message);
    } else {
      errors = [err.message];
    }

    const ctx = {
      errors,
      tripData: {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
      },
    };
    res.render("trip-create", ctx);
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const tripData = await req.storage.getTripById(req.params.id);

    tripData.isUser = Boolean(req.user);
    tripData.isCreator = req.user && req.user._id == tripData.creator;
    tripData.joined = req.user && tripData.buddies.find(u => u._id == req.user._id);
    tripData.freeSeats = tripData.seats > 0
    tripData.existingPeople = tripData.buddies.length > 0

    res.render("trip-details", { tripData }); 
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.get("/edit/:id", isUser(), async (req, res) => {
  try {
    const trip = await req.storage.getTripById(req.params.id);

    if (req.user._id != trip.creator) {
      throw new Error("Cannot edit a trip that you have not created!");
    }

    res.render("trip-edit", { tripData: trip });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

router.post("/edit/:id", isUser(), async (req, res) => {
  try {
    const trip = await req.storage.getTripById(req.params.id);

    if (req.user._id != trip.creator) {
      throw new Error("Cannot edit a trip that you have not created!");
    }

    await req.storage.editTrip(req.params.id, req.body);

    res.redirect("/trip/details/" + req.params.id);
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
      tripData: {
        _id: req.params.id,
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
      },
    };
    res.render("trip-edit", ctx);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const trip = await req.storage.getTripById(req.params.id);

    if (req.user._id != trip.creator) {
      throw new Error("Cannot delete a trip that you have not created!");
    }

    await req.storage.deleteTrip(req.params.id);
    res.redirect("/trip/trips");
  } catch (err) {
    console.log(err.message);
    res.redirect("/trip/trips");
  }
});

router.get("/join/:id", isUser(), async (req, res) => {
  try {
    await req.storage.joinTrip(req.params.id, req.user._id);
    res.redirect("/trip/details/" + req.params.id);
  } catch (err) {
    console.log(err.message)
    res.redirect("/trip/details/" + req.params.id)
  }
});

module.exports = router;
