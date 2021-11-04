const fs = require("fs");

console.log("Before");
handleFiles();
console.log("After");

function handleFiles() {
  const data = fs.readFile("./package.json", (err, data) => {
    console.log(data.toString());
  });
}
