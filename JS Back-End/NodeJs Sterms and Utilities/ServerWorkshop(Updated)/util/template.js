const fs = require("fs/promises")

async function loadTemplate(name) {
  try {
    const template = await fs.reafFile(`./views/${name}.html`)
    return template.toString()
  } catch(err) {
    return ``
  }
}

async function layout (html, title = "Welcome") {
  const result = await loadTemplate("layout")
  return result.replace("{{title}}", title).replace("{{body}}", html)
}

module.exports = {
  loadTemplate,
  layout
}
