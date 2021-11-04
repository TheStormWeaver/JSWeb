const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = require("../services/user");
const { TOKEN_SECRET, COOKIE_NAME } = require("../config");

module.exports = () => (req, res, next) => {
  if (parseToken(req, res)) {
    req.auth = {
      async register(username, password) {
        const token = await register(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      async login(username, password) {
        const token = await login(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      logout() {
        res.clearCookie(COOKIE_NAME);
      },
    };
    next();
  }
};

async function register(username, password) {
  const existing = await userService.getUserByUsername(username);

  if (existing) {
    const err = new Error("Username is taken!");
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userService.createUser(username, hashedPassword);

  return generateToken(user);
}

async function login(username, password) {
  const user = await userService.getUserByUsername(username);

  if (!user) {
    const err = new Error("Username is taken!");
    err.type = "credentail";
    throw err;
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!hasMatch) {
    const err = new Error("Wrong username or password");
    err.type = "credentail";
    throw err;
  }

  return generateToken(user);
}

function generateToken(userData) {
  const token = jwt.sign(
    {
      _id: userData._id,
      username: userData.username,
    },
    TOKEN_SECRET
  );
  return token;
}

function parseToken(req, res) {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    try {
      const userData = jwt.verify(token, TOKEN_SECRET);
      req.user = userData;
      res.locals.user = userData; // this gives acess to the {{#if user}} part in main, home and the other templates if needed
    } catch (err) {
      res.clearCookie(COOKIE_NAME);
      res.redirect("/auth/login");

      return false;
    }
  }
  return true;
}
