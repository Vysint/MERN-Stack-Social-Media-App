const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.getAllusers = async (req, res) => {
  try {
    let users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id, "-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  const { _id, userAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        req.body.password = await bcrypt.hash(password, 12);
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("Acces Denied! You can only update your profile");
  }
};

// Delete user

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  const { userId, isAdminStatus } = req.body;

  if (userId === id || isAdminStatus) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully!");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json("Access Denied! You can only delete your profile.");
  }
};

// Follow a user

exports.followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followedUser = await User.findById(id);
      const followingUser = await User.findById(_id);

      if (!followedUser.followers.includes(_id)) {
        await followedUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });

        res.status(200).json("User Followed");
      } else {
        res.status(403).json("Already following this user.");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
// unfollow a user
exports.unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followeduser = await User.findById(id);
      const followingUser = await User.findById(_id);

      if (followeduser.followers.includes(_id)) {
        await followeduser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
