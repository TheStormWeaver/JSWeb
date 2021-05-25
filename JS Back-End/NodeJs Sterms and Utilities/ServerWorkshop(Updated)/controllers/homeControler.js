const { loadTemplate } = require("../util/template.js")
const layout = require("../views/layout.js")


module.exports = (req, res) => {
  const homePage = await loadTemplate("home")
  res.write(layout(homePage))
  res.end()
}
