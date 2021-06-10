const express = require("express");
const bodyParser = require("express").urlencoded
const expressSession = require("express-session")

const users = {}

const app = express();

app.use(bodyParser({ extended: false }))

app.use(expressSession({
  secret: "my random secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.all("*", (req, res, next) => {
  console.log(">>>", req.method, req.url, req.body)
  console.log(">>> Session data", req.session)
  next()
})

app.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1>
  <a href="/">Home</a>
  <a href="/register">Register</a>
  <a href="/login">Login</a>`)
});

app.get("/register", (req, res) => {
  res.send(`
  <h1>Register</h1><a href="/">Home</a><a href="/login">Login</a>
  <form action="/register" method="POST">
  <label>Username: <input type="text" name="username"></label>
  <label>Password: <input type="password" name="password"></label>
  <label>Repeat Pass: <input type="password" name="repass"></label>
  <input type="submit" name="Register">
  </form> 
  `)
})

app.get("/login", (req, res) => {
  res.send(`
  <h1>Login</h1><a href="/">Home</a><a href="/register">Register</a>
  <form action="/login" method="POST">
  <label>Username: <input type="text" name="username"></label>
  <label>Password: <input type="password" name="password"></label>
  <input type="submit" name="Login">
  </form> 
  `)
})

app.post("/register", (req, res) => {
  const username = req.body.username

  users[username] = {
    id: ("0000" + (Math.random() * 9999) | 0).toString(16).slice(-4),
    password: req.body.password
  }

  res.redirect("/login")

})

app.post("/login", (req, res) => {
  const user = users[req.body.username]
  if(user && user.password == req.body.password){
    req.session.user = user
    res.redirect("/")
  }else{
    res.send('Wrong password')
  }
  
})

app.listen(3030);
