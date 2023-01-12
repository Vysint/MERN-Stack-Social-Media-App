const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/UserController");
const authMiddleware = require("../middleware/Auth");

router.get("/", userControllers.getAllusers);

router.get("/:id", userControllers.getUser);

router.put("/:id", authMiddleware, userControllers.updateUser);

router.delete("/:id", authMiddleware, userControllers.deleteUser);

router.put("/:id/follow", authMiddleware, userControllers.followUser);

router.put("/:id/unfollow", authMiddleware, userControllers.unFollowUser);

module.exports = router;
