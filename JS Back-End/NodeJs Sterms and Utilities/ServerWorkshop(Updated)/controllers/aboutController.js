const layout = require("../views/layout.js")

const html = `
<div>
  <h1>About Page</h1>
  <p>about page</p>
</div>
`;

module.exports = (req, res) => {
  res.write(layout(html, "About"))
  res.end()
}
