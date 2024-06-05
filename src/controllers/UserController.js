const UserService = require("../services/UserServices");
const jwtservice = require("../services/JwtServices");
const MailService = require("../services/MailServices");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");

const CreateUser = async (req, res) => {
  try {
    const { UserName, Email, Password, confirmPassword } = req.body;
    if (!UserName || !Email || !Password || !confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (Password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password and confirm password are not the same",
      });
    }

    const checkEmail = await User.findOne({ Email });
    if (checkEmail !== null) {
      return res.status(200).json({
        status: "ERROR",
        message: "Email already exists",
      });
    }

    const newUser = await UserService.createUser(req.body);
    try {
      const token = await Token.create({
        UserId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      const sendEmail = await MailService.sendMail(
        newUser.Email,
        "Verify your email",
        `Please verify your account by clicking the link: http://localhost:8888/api/mail/verify/${newUser.Email}/${token.token} + '\n\nThank You!\n' `
      );
    } catch (e) {
      console.log(e);
    }
    return res.status(200).json({
      status: "OK",
      message: "User created successfully",
      data: newUser,
    });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const user = await UserService.FindUserByUserName(UserName);
    if (!user) {
      return res.status(200).json({
        status: "ERROR",
        message: "The user does not exist",
      });
    }
    const userPass = user.data.Password;
    const isPasswordMatch = UserService.CheckPassword(Password, userPass);
    if (!isPasswordMatch) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password is incorrect",
      });
    }
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.DeleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const GetDetailsUser = async (req, res) => {
  try {
    const userName = req.params.UserName;
    if (!userName) {
      return req.status(200).json({
        status: "ERROR",
        message: "The UserName is required",
      });
    }
    const response = await UserService.GetDetailsUserByUserName(userName);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return req.status(200).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await jwtservice.refreshToken(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  DeleteUser,
  GetDetailsUser,
  RefreshToken,
};
