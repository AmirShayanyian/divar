const autoBind = require('auto-bind');
const AuthService = require('./auth.service');
class AuthController {
  service;
  constructor() {
    autoBind(this);
    this.service = new AuthService();
  }

  static async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.service
        .sendOTP(mobile)
        .then((result) => {
          if (result) {
            return res.send({
              data: result,
              message: 'User has been created',
            });
          }
          return res.send({
            message: 'OTP has been sent',
          });
        })
        .catch();
    } catch (error) {
      next(error);
    }
  }

  static async checkOTP(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
