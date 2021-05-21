const http = require("http");
const router = require("./router.js");
const homeController = require("./controllers/homeControler.js")

router.registerHandler("/", homeController)

const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res) {
  console.log(">>>", req.method, req.url);
  const handler = router.match(req.url)
  handler(req, res)
}

server.listen(port, () => console.log("Server listening on port" + port));
