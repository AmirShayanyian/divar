const autoBind = require('auto-bind');
const userModel = require('./user.model');
const createHttpError = require('http-errors');
class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  
}

module.exports = UserService;
