const events = require("events")

const publisher = new events.EventEmitter()

publisher.on("ping", firstHandler)
publisher.on("ping", secondHandler)
publisher.on("pong", thirdHandler)

function firstHandler(msg) {
  console.log("First", msg)
}

function secondHandler(msg) {
  console.log("Second", msg.length)
}

function thirdHandler(a, b) {
  console.log("Third", a + b)
}

console.log("Before")
publisher.emit("ping", "Hello World!")

console.log("After")
publisher.emit("ping", "Hello again!")
