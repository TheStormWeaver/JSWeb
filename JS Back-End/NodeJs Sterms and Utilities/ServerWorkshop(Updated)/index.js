const http = require("http");
const url = require("url");

const router = require("./router.js");

const homeController = require("./controllers/homeControler.js");
const aboutController = require("./controllers/aboutController.js");
const catalogController = require("./controllers/catalogController.js");
const createController = require("./controllers/createController.js");
const deleteController = require("./controllers/deleteController.js");
const uploadController = require("./controllers/uploadController.js");

router.get("/", homeController);
router.get("/about", aboutController);
router.get("/catalog", catalogController);

router.post("/create", createController);
router.get("/delete", deleteController);
router.post("/upload", uploadController);

const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res) {
  const url = new URL(req.url, "http://localhost");
  console.log(">>>", req.method, req.url, req.path, req.pathname);
  const handler = router.match(req.method, url.pathname);
  handler(req, res);
}

server.listen(port, () => console.log("Server listening on port" + port));

