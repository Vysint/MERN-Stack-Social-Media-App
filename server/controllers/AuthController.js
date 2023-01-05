const bcrypt = require("bcryptjs");

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
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;

  try {
    identifiedUser = await User.findOne({ email: email });

    if (identifiedUser) {
      const validPassword = await bcrypt.compare(
        password,
        identifiedUser.password
      );

      validPassword
        ? res.status(200).json(identifiedUser)
        : res.status(400).json("You entered the wrong Password");
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
