const MailService = require('./MailService');

const verifyOtp = async (Username) => {
    try {
        const user = await User.findOne({ UserName: UserName });
        
    }
    catch (e) {
        reject(e)
    }
}

module.exports = {
    verifyOtp,
};
