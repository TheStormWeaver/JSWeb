const express = require("express")
const mongoose = require("mongoose")

const cors = require("./middlewares/cors")
const furnitureController = require("./controllers/furnitureController")

start()

async function start() {
  await new Promise((resolve, reject) => {
    mongoose.connect("mongodb://localhost:27017/furniture-rest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const db = mongoose.connection
    db.once("open", () => {
      console.log("Databse connected")
      resolve()
    })
    db.on("error", (err) => reject(err))
  })

  const app = express()

  app.use(cors())
  app.use(express.json())
  
  app.use("/data/catalog", furnitureController)
  
  app.get("/", (req, res) => res.send("It Works"))
  
  app.listen(5000, () => console.log("REST Service is running on port 5000"))
}

