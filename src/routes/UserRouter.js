const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware, authVerifyMiddleware } = require("../Middleware/authMiddleware");

router.post("/signup", userController.CreateUser);
router.post("/signin", userController.LoginUser);
router.post("/send/otp", authVerifyMiddleware, userController.SendOTP);
router.get("/verify/otp", userController.VerifyOTP);
router.delete("/delete-user/:id", authMiddleware, userController.DeleteUser);
router.get("/get-details/:UserName", authUserMiddleware, userController.GetDetailsUser);

module.exports = router;
