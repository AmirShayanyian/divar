const autoBind = require('auto-bind');
const AuthService = require('./auth.service');
class AuthController {
  service;
  constructor() {
    autoBind(this);
    this.service = new AuthService();
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.service
        .sendOTP(mobile)
        .then((result) => {
          if (result) {
            return res.json({
              data: result,
              message: 'User has been created',
            });
          }
          return res.json({
            message: 'OTP has been sent',
          });
        })
        .catch((err) => {
          return res.json({
            error: err.message,
          });
        });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      await this.service
        .checkOTP(mobile, code)
        .then((result) => {
          if (result) {
            return res.json({
              data: result,
              message: 'User logged In successfully',
            });
          }
        })
        .catch((err) => {
          return res.json({
            error: err.message,
          });
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
