const parseForm = require("../util/formParser.js");

const database = require("../util/database.js");

module.exports = async (req, res) => {
  const body = await parseForm(req);

  console.log("Created Item");

  database.additem(body);

  res.writeHead(301, {
    Location: "/catalog",
  });
  res.end();
};  
