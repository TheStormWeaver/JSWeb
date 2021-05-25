const fs = require("fs/promises")

async function loadTemplate(name) {
  try {
    const template = await fs.reafFile(`./views/${name}.html`)
    return template
  } catch(err) {
    return ``
  }
}

function renderLayout (html, title = "Welcome") {
  const layout = loadTemplate("layout")
  return layout.replace("{{title}}", title).replace("{{body}}", html)
}

module.exports = {
  loadTemplate,
  renderLayout
}
