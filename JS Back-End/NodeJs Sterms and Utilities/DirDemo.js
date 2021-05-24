const fs = require("fs/promises");

demo()
createDir()
deleteDir()

function demo() {
  const files = await fs.readdir(".");
  console.log(files)
}

function createDir() {
  const dir = await fs.mkdir("./demoDir");
}

function deleteDir() {
  await fs.rmdir("./demoDir");
}
