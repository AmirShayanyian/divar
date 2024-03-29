const autoBind = require('auto-bind');
const userModel = require('../user/user.model');
const { randomInt } = require('crypto');
const createHttpError = require('http-errors');
const { nextTick } = require('process');
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
        console.log('hi');
        return new createHttpError.NotFound('User not found');
      }
      if (user?.otp?.expiresIn < now)
        return new createHttpError.BadRequest('The OTP code has been expired!');
      if (user?.otp?.code !== code)
        return new createHttpError.BadRequest('The OTP code is wrong');
      return user;
    } catch (error) {
      nextTick(error);
    }
  }
}

module.exports = AuthService;
