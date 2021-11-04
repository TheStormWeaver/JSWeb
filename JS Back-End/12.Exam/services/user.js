const User = require("../models/User");

async function createUser(email, hashedPassword) {
  const user = new User({
    email,
    hashedPassword
  });
  await user.save();

  return user
}

async function getUserByEmail(email) {
  const pattern = new RegExp(`^${email}$`, "i")
  return await User.findOne({ email: { $regex: pattern } });
}

module.exports = {
  createUser,
  getUserByEmail,
};