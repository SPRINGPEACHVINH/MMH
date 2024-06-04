const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware } = require("../Middleware/authMiddleware");

router.post("/signup", userController.CreateUser);
router.post("/signin", userController.LoginUser);
router.delete("/delete-user/:id", authMiddleware, userController.DeleteUser);
router.get("/get-details/:UserName", authUserMiddleware, userController.GetDetailsUser);
router.post("/refresh-token", userController.RefreshToken);

module.exports = router;
