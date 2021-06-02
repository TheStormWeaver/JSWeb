const mongoose = require("mongoose");

start()

async function start() {
  const connectionStr = "mongodb://localhost27017";

  const client = await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");

  const catSchema = new mongoose.Schema({
    name: String,
    color: String
  })
  const Cat = mongoose.model("Cat", catSchema)

  const myCat = new Cat({
    name: "Garry",
    color: "Turquoise"
  })
  await myCat.save()

  const data = await Cat.find({})

  console.log(data)
}
