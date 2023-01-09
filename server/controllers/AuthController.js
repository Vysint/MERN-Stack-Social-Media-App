const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Registering a new User
exports.signup = async (req, res, next) => {
  // const { email, password, firstname, lastname } = req.body;

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  req.body.password = hashedPassword;

  const newUser = new User(req.body);
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const user = await newUser.save();
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email: email });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json("You entered a wrong password.");
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
