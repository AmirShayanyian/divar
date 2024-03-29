const autoBind = require('auto-bind');
const userModel = require('../user/user.model');
const { randomInt } = require('crypto');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async sendOTP(mobile) {
    try {
      const user = await this.#model.findOne({ mobile });
      const now = new Date().getTime();
      const otp = {
        code: randomInt(10000, 99999),
        expiresIn: now + 1000 * 60 * 10,
      };
      if (!user) {
        const newUser = await this.#model.create({ mobile, otp });
        return newUser;
      }
      if (user.otp && user.otp.expiresIn > now) {
        return new createHttpError.BadRequest(
          'The OTP code is not expired yet '
        );
      }
      user.otp = otp;
      await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkOTP(mobile, code) {
    try {
      const user = await this.#model.findOne({ mobile });
      const now = new Date().getTime();
      if (!user) {
        return new createHttpError.NotFound('User not found');
      }
      if (user?.otp?.expiresIn < now)
        return new createHttpError.BadRequest('The OTP code has been expired!');
      if (user?.otp?.code !== code)
        return new createHttpError.BadRequest('The OTP code is wrong');
      if (!user.verifiedMobile) {
        user.verifiedMobile = true;
        await user.save();
      }
      const accessToken = await this.signToken({ mobile, userId: user._id });
      user.accessToken = accessToken;
      await user.save();
      return accessToken;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1y' });
  }
}

module.exports = AuthService;
