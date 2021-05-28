const router = reuire("express").Router()

router.get('/catalog', (req, res) => {
  res.send("Catalog Page")
})

app.post()

const data = {
  name: "Peter",
  age: 22
}

app.post("/catalog", (req, res) => {
  res.json(data)
})

module.exports = router
