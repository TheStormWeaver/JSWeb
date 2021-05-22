const database = require("../util/database.js")

module.exports = (req, res) => {
  const id = req.url.split("=")[1]
  database.deleteItem(id)

  res.writeHead(301, {
    "Location": "/catalog"
  })
  res.end()
}
