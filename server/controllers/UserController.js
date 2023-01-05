const bcrypt = require("bcryptjs");

const User = require("../models/user");

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

  const { userId, userAdminStatus, password } = req.body;

  if (id === userId || userAdminStatus) {
    try {
      if (password) {
        req.body.password = await bcrypt.hash(password, 12);
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
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

  const { userId } = req.body;

  if (userId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followedUser = await User.findById(id);
      const followingUser = await User.findById(userId);

      if (!followedUser.followers.includes(userId)) {
        await followedUser.updateOne({ $push: { followers: userId } });
        await followingUser.updateOne({ $push: { following: id } });

        res.status(200).json("User Followed");
      } else {
        res.status(500).json("Already following the user.");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
// unfollow a user
exports.unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;

  if (userId === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followeduser = await User.findById(id);
      const followingUser = await User.findById(userId);

      if (followeduser.followers.includes(userId)) {
        await followeduser.updateOne({ $pull: { followers: userId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User unfollowed!");
      } else {
        res.status(403).json("User is not followed by you1");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
