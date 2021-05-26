const { layout } = require("../util/template.js");
const database = require("../util/database.js");

const html = (items) => `
<div>
  <h1>Catalog</h1>
  <form method="POST" action="/create">
  <label>Name <input type="text" name="name">
  <label>S/N <input type="text" name="serial">
  <input type="submit" value="Create Item">
  </from>
  <ul>
  ${items.map(([id, item]) => `<li data-id="${id}">${item.name} - ${item.serial} <a href="/delete?id=${id}">[Delete]</a> </li>`).join("")}
    
    <li>Second Item</li>
    <li>Third Item</li>
  </ul>
</div>
`;

module.exports = async (req, res) => {
  res.write(await layout(html(Object.entries(database.database))))
  res.end()
}

