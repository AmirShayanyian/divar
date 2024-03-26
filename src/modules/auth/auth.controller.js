const authService = require('./auth.service');
const autoBind = require('auto-bind');
class AuthController {
  #service;
  constructor() {
    this.#service = authService;
    autoBind(this);
  }

  static async sendOTP(req, res, next) {
    try {
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
