const express = require("express")

const dataController = require("./dataController")

const app = express()

app.use((req, res, next) => {
  res.setHeader("Acess-Controll-Allow-Origin", "*")
  res.setHeader("Acess-Controll-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
  res.setHeader("Acess-Controll-Allow-Header", "Content-Type")

  next()
})

app.use(express.json())

app.use("/api", dataController)

app.get("/", (req, res) => {
  res.send("Rest service operational. Send Requests to /api")
})

app.listen(5000, () => console.log(`Server listening on port 5000`))