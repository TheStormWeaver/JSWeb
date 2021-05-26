const { layout, render } = require("../util/template.js");
const database = require("../util/database.js");

module.exports = async (req, res) => {
  const catalogPage = await render("catalog", {
    items: Object.entries(database.database)
      .map(
        ([id, item]) =>
          `<li data-id="${id}">${item.name} - ${item.serial} <a href="/delete?id=${id}">[Delete]</a> </li>`
      )
      .join(""),
  });
  res.write(await layout(catalogPage, "Catalog"));
  res.end();
};
