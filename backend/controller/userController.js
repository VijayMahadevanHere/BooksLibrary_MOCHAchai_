const { registerSchema, loginSchema } = require("../validation/userSchema");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const generateToken = require("../jwt/generateToken");

const users = []; //user collection

//@desc   Register User
//@route  POST /api/users/
//@access Public

const registerUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { error, value } = registerSchema.validate({
    username,
    email,
    password,
  });
  if (error) {
    res.status(400);
    throw new Error(error.message);
  } else {
    let uniqueUser = users.every((user) => user.email !== email); // Check user Exist?

    if (uniqueUser) {
      let salt = await bcrypt.genSalt(10); // Hash the password.
      let hashPassword = await bcrypt.hash(password, salt);

      const newUser = {
        username,
        email,
        password: hashPassword,
      };

      (newUser.id = Math.floor(Math.random() * 100000) + Date.now()),
        users.push(newUser); // Register the user.
      res.status(201).json({
        id: newUser.id,
        name: newUser.username,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } else {
      res.status(409);
      throw new Error({
        message: "Email is already registered. Please use a different email.",
      });
    }
  }
});

//@desc   Authenticate a user
//@route  POST /api/users/login
//@access Public

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const { error, value } = loginSchema.validate({ email, password }); // Validate the user.
  if (error) {
    res.status(400);
    throw new Error(error.message);
  } else {
    const matchedUser = users.find((user) => user.email === email);

    if (matchedUser && (await bcrypt.compare(password, matchedUser.password))) {
      res.json({
        id: matchedUser.id,
        name: matchedUser.username,
        email: matchedUser.email,
        token: generateToken(matchedUser.id),
      }); // Matched email & password.
    } else {
      res.status(401);
      throw new Error("Invalid credentials. Login failed.");
    }
  }
});

//@desc   Get user details
//@route  GET /api/users/me
//@access Private

const getme = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getme,
  users,
};
