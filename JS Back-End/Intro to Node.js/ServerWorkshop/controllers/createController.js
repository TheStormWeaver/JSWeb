const formidable = require("formidable")

const database = require("../util/database")

module.exports = (req, res) => {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields) => {
    console.log("Created Item")

    database.push(fields)

    res.writeHead(301, {
      "Redirect": "/catalog"
    })
    res.end()
  })
}
