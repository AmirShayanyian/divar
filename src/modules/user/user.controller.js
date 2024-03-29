const autoBind = require('auto-bind');
const UserService = require('./user.service');
const  createHttpError  = require('http-errors');
class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = new UserService();
  }

  async getUserProfile(req, res, next) {
    try {
      const user = req.user;
      return res.status(200).json({
        status: 200,
        message: 'User profile data',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
