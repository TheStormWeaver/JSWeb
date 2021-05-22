const layout = require("../views/layout.js")
const database = require("../util/database.js")

const html = (items) => `
<div>
  <h1>Catalog</h1>
  <form method="POST" action="/create">
  <label>Name <input type="text" name="name">
  <label>S/N <input type="text" name="serial">
  <input type="submit" value="Create Item">
  </from>
  <ul>
  ${items.map(item => `<li>${item.name} - ${item.serial}</li>`)}
    
    <li>Second Item</li>
    <li>Third Item</li>
  </ul>
</div>
`;

module.exports = (req, res) => {
  res.write(layout(html(database)))
  res.end()
}

