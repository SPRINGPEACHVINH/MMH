const Token = require("../models/Token");
const User = require("../models/User");
const MailService = require("../services/MailServices");
const UserService = require("../services/UserServices");

const sendMail = async (req, res) => {
  const { Email, Subject, Content } = req.body;
  if (!Email || !Subject || !Content) {
    return res.status(200).json({
      status: "ERROR",
      message: "The input is required",
    });
  }
  const findEmail = await UserService.FindUserByEmail(Email);
  if (findEmail === null) {
    return res.status(200).json({
      status: "ERROR",
      message: "User does not exist",
    });
  }
  const sendMail = await MailService.sendMail(Email, Subject, Content);
  console.log(sendMail);
  return res.status(200).json({
    status: "OK",
    message: "Email sent successfully",
    data: sendMail,
  });
};

const verifyMail = async (req, res) => {
  const token = await Token.findOne({ token: req.params.token });
  if (!token) {
    return res.status(200).json({
      status: "ERROR",
      message:
        "Your verification link may have expired. Please click on resend for verify your Email",
    });
  } else {
    const user = await User.findOne({ Email: req.params.email});
    if (!user) {
      return res.status(200).json({
        status: "ERROR",
        message:
          "We were unable to find a user for this verification. Please SignUp!",
      });
    } else if (user.isVerified) {
      return res.status(200).json({
        status: "ERROR",
        message: "This user has already been verified. Please Login",
      });
    } else {
      try {
        await User.updateOne({ Email: req.params.email }, { isVerified: true });
        await Token.findByIdAndDelete(token._id);
        return res.status(200).json({
          status: "OK",
          message: "The account has been successfully verified.",
        });
      } catch (e) {
        return res.status(500).json({
          status: "ERROR",
          message: e.message,
        });
      }
    }
  }
};

module.exports = {
  sendMail,
  verifyMail,
};
