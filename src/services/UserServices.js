const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const genneralToken = require("./JwtServices");
require("dotenv").config();

const createUser = async (newUser) => {
  try {
    const { UserName, Password, Email, PhoneNumber, Address } = newUser;
    const bcryptjs_salt = parseInt(process.env.BCRYPTJS_SALT);
    if (isNaN(bcryptjs_salt)) {
      throw new Error(
        "BCRYPTJS_SALT environment variable is not set or not a number"
      );
    }
    const hash = bcryptjs.hashSync(
      Password,
      bcryptjs_salt,
      function (err, hash) {
        if (err) {
          console.log("Error: ", err);
        }
      }
    );

    const createdUser = await User.create({
      UserName,
      Password: hash,
      Email,
      PhoneNumber,
      Address,
    });
    
    return createdUser;
  } catch (e) {
    console.log(e);
  }
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { UserName, Password } = userLogin;
    try {
      const checkUser = await User.findOne({
        UserName: UserName,
      });
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "The user does not exist",
        });
      }
      const comparePassword = bcryptjs.compareSync(
        Password,
        checkUser.Password,
        function (err, res) {
          if (err) {
            console.log("Error: ", err);
          }
        }
      );
      if (!comparePassword) {
        resolve({
          status: "ERROR",
          message: "The password is incorrect",
        });
      }
      if (!checkUser.isVerified) {
        resolve({
          status: "ERROR",
          message: "The account has not been verified",
        });
      }
      
      const access_token = await genneralToken.genneralAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
        isVerified: checkUser.isVerified,
      });

      resolve({
        status: "OK",
        message: "Success",
        access_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const CheckPassword = (inputPassword, userPassword) => {
  return bcryptjs.compareSync(inputPassword, userPassword);
};

const FindUserByUserName = (UserName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ UserName: UserName });
      if (!user) {
        resolve({
          status: "ERROR",
          message: "User does not exist",
        });
      } else {
        resolve({
          status: "OK",
          message: "User fetched successfully",
          data: {
            UserId: user._id,
            UserName: user.UserName,
            Email: user.Email,
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const DeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "User does not exist",
        });
      }

      const DeletedUser = await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "User deleted successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const GetDetailsUserByUserName = (UserName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ UserName: UserName });
      if (!user) {
        resolve({
          status: "ERROR",
          message: "User does not exist",
        });
      } else {
        resolve({
          status: "OK",
          message: "User fetched successfully",
          data: {
            UserName: user.UserName,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
          },
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  FindUserByUserName,
  CheckPassword,
  DeleteUser,
  GetDetailsUserByUserName,
};
