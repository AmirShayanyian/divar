const autoBind = require('auto-bind');
const userModel = require('../user/user.model');
const { randomInt } = require('crypto');
const errorModels = require('http-errors');
class AuthService {
  model;
  constructor() {
    autoBind(this);
    this.model = userModel;
  }
  async sendOTP(mobile) {
    try {
      const user = await this.model.findOne({ mobile });
      const now = new Date().getTime();
      const otp = {
        code: randomInt(10000, 99999),
        expiresIn: now + 1000 * 60 * 2,
      };
      if (!user) {
        const newUser = await this.model.create({ mobile, otp });
        return newUser;
      }
      if (user.otp && user.otp.expiresIn > now) {
        throw new errorModels.BadRequest('The OTP code is not expired yet ');
      }
      user.otp = otp;
      await user.save();
    } catch (error) {}
  }

  async checkOTP(mobile, code) {
    try {
    } catch (error) {}
  }
}

module.exports = AuthService;
