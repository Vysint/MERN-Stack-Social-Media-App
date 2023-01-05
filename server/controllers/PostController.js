const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

// Create a new POST

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    await newPost.save();
    res.status(200).json("Post created!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET A POST

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Post

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Action forbidden!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a POST

exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  const { userId } = req.body;

  let post;
  try {
    post = await Post.findById(postId);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully!");
    } else {
      res.status(403).json("Action Forbidden!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like and dislike a POST

exports.likePost = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked!");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TIMELINE POST

exports.getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const userPosts = await Post.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      userPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
