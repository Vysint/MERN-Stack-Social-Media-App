const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/UserController");

router.get("/:id", userControllers.getUser);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

router.put("/:id/follow", userControllers.followUser);

router.put("/:id/unfollow", userControllers.unFollowUser);

module.exports = router;
