const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware } = require("../Middleware/authMiddleware");

router.post("/signup", userController.CreateUser);
router.post("/signin", userController.LoginUser);
router.delete("/delete-user/:id", authMiddleware, userController.DeleteUser);

module.exports = router;
