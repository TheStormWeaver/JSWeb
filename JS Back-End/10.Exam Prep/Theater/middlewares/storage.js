const play = require("../services/play");

module.exports = () => (req, res, next) => {
  req.storage = {
    ...play,
  };

  next();
};
