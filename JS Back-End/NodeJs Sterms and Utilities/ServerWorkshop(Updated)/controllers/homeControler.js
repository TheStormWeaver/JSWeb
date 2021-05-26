const { loadTemplate, layout } = require("../util/template.js")

module.exports = (req, res) => {
  const homePage = await loadTemplate("home")
  res.write(await layout(homePage))
  res.end()
}
