const fs = require("fs/promises");

demo()
createDir()
deleteDir()

function demo() {
  const files = await fs.readdir(".");
  console.log(files)
}

async function createDir() {
  const dir = await fs.mkdir("./demoDir");
  console.log(dir)
}

function deleteDir() {
  await fs.rmdir("./demoDir");
}
