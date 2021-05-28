function isAdmin(req, res, next) {
  if(req.headers.hasOwnProperty("X-Admin")){
    next()
  }else{
    res.status(401)
    res.send("Admins only page")
  }
}

module.exports = isAdmin
