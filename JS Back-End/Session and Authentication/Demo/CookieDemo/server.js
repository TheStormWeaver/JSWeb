const express = require("express")

const app = express()

const sessions = {}

app.get("/", (req, res) => {
  let visited = 0
  if(req.headers.cookie){
    let value = Number(req.headers.cookie.split("=")[1])
    visited = value
  }

  res.setHeader("Set-Cookie", `sessionId=${visited + 1}`)

  res.send("<h1>Hello</h1><p>You have visited this web page " + visited + " times. </p>")
})

app.listen(3030)
