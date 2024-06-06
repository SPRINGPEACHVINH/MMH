const UserService = require("../services/UserServices");
const jwtservice = require("../services/JwtServices");
const MailService = require("../services/MailServices");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const OTP = require("../models/OTP");
const Transaction = require("../models/Transaction");

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
        `Please verify your account by clicking the link: http://localhost:8888/api/mail/verify/${newUser.Email}/${token.token} \nThank You!\n`
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

const VerifyOTP = async (req, res) => {
  try {
    const OtpCode = await OTP.findOne({ otp: req.body.otp });
    const user = await User.findOne({ UserName: req.body.UserName });

    if (!OtpCode) {
      return res.status(404).json({
        status: "ERROR",
        message: "The OTP is invalid or may have expired",
      });
    } else if (OtpCode.isUsed) {
      const deleteOTP = await OTP.findByIdAndDelete(OtpCode._id);
      return res.status(409).json({
        status: "ERROR",
        message: "The OTP is already used",
      });
    } else if (!user) {
      return res.status(404).json({
        status: "ERROR",
        message: "The user does not exist",
      });
    } else {
      if (OtpCode.otp !== user.otp) {
        return res.status(400).json({
          status: "ERROR",
          message: "The OTP is invalid",
        });
      } else {
        const deleteOTP = await OTP.findByIdAndDelete(OtpCode._id);
        await user.updateOne({ otp: null });
        return res.status(200).json({
          status: "OK",
          message: "The OTP is valid",
        });
      }
    }
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const SendOTP = async (req, res) => {
  try {
    const user = await User.findOne({ UserName: req.body.UserName });
    if (!user) {
      return res.status(404).json({
        status: "ERROR",
        message: "The user does not exist",
      });
    }

    const newOTP = await OTP.create({
      UserId: user._id,
      otp: crypto.randomInt(0, Math.pow(10, 6)).toString().padStart(6, "0"),
    });
    await user.updateOne({ otp: newOTP.otp });

    const sendEmail = await MailService.sendMail(
      user.Email,
      "Verify your OTP",
      `Your OTP is: ${newOTP.otp}`
    );

    return res.status(200).json({
      status: "OK",
      message: "The OTP has been sent to your email",
    });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const Transfer = async (req, res) => {
  try {
    const { From, To, amount } = req.body;
    if (!From || !To || !amount) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const fromUser = await User.findOne({ UserName: From });
    const toUser = await User.findOne({ UserName: To });
    if (!fromUser || !toUser) {
      return res.status(404).json({
        status: "ERROR",
        message: "The user does not exist",
      });
    }
    if (fromUser.Balance < amount) {
      return res.status(400).json({
        status: "ERROR",
        message: "The balance is not enough",
      });
    } else {
      console.log("fromUser", fromUser.UserName);
      const transfer = await Transaction.create({
        From: fromUser.UserName,
        To: toUser.UserName,
        amount: amount,
      });
      await fromUser.updateOne({ Balance: fromUser.Balance - amount });
      await toUser.updateOne({ Balance: toUser.Balance + +amount });
      return res.status(200).json({
        status: "OK",
        message: "Transfer successfully",
        data: transfer,
      });
    }
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const TransferHistory = async (req, res) => {
  try {
    const userName = req.body.UserName;
    if (!userName) {
      return res.status(200).json({
        status: "ERROR",
        message: "The UserName is required",
      });
    }
    const history = await Transaction.find().populate('From', ['UserName']).populate('To', ['UserName']);
    return res.status(200).json({
      status: "OK",
      message: "History fetched successfully",
      data: history,
    });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

// const RefreshToken = async (req, res) => {
//   try {
//     const token = req.headers.token.split(" ")[1];
//     if (!token) {
//       return req.status(200).json({
//         status: "ERROR",
//         message: "The token is required",
//       });
//     }
//     const response = await jwtservice.refreshToken(token);
//     return res.status(200).json(response);
//   } catch (e) {
//     return res.status(404).json({
//       error: e.message,
//     });
//   }
// };

module.exports = {
  CreateUser,
  LoginUser,
  DeleteUser,
  GetDetailsUser,
  SendOTP,
  VerifyOTP,
  Transfer,
  TransferHistory,
};
