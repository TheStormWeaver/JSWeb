module.exports = {
  PORT: 3030,
  DB_CONNECTION_STRING: "mongodb://localhost:27017/exam-db",  //change the name of the database in the final part of the DB_CONNECTION_STRING (after the 27017)
  TOKEN_SECRET: "This is very secure",
  COOKIE_NAME: "SESSION_TOKEN"
}