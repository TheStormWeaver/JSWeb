const router = require("express").Router()

const { getAll, getById } = require("../services/furniture")

router.get("/", async (req, res) => {
  const data = await getAll()
  res.json(data)
})

router.post("/", async (req, res) => {
  console.log(req.body)
  res.status(201).json(req.body)
})

module.exports = router