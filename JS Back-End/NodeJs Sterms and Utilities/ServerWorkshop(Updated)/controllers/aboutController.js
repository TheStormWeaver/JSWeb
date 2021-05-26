const { layout } = require("../util/template");

const html = `
<div>
  <h1>About Page</h1>
  <p>about page</p>
</div>
`;

module.exports = async (req, res) => {
  res.write(await layout(html, "About"))
  res.end()
}


