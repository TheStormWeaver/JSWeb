const layout = require("../views/layout.js")

const homePage = `
<div>
  <h1>Home Page</h1>
  <p>Welcome to the home page!</p>
</div>
`;

module.exports = (req, res) => {
  res.write(layout(homePage))
  res.end()
}