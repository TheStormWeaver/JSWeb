const http = require("http");
const router = require("./router.js");

router.registerHandler("/", (req, res) => {
  res.write(homePage);
  res.end();
});

const port = 3000;
const server = http.createServer(requestHandler);

const homePage = `
<html>
<body>
  <div>
    <h1>The Page</h1>
    <p>Welcome to the page!</p>
  </div>
</body>
</html>
`;

function requestHandler(req, res) {
  console.log(">>>", req.method, req.url);
  const handler = router.match(req.url)
  handler(req, res)
}

server.listen(3000);
