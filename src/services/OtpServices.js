const OTP = require("../models/OTP");

const verifyOtp = async (otp) => {
    try {
        const otpData = await OTP.findOne({ otp: otp });
        if (!otpData) {
            throw new Error("OTP is invalid");
        }
        if (otpData.isUsed) {
            throw new Error("OTP is already used");
        }
        if (otpData.expireAt < new Date()) {
            throw new Error("OTP is expired");
        }

        
        otpData.isUsed = true;
        await otpData.save();
        return otpData.UserId;
    }
    catch (e) {
        reject(e)
    }
}

module.exports = {
    verifyOtp,
};
