const autoBind = require('auto-bind');
const OptionService = require('./option.service');
const HttpCodes = require('http-codes');
const OptionMessage = require('./option.message');
class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = new OptionService();
  }
  async create(req, res, next) {
    try {
      const { title, key, guide, type, enum: list, category } = req.body;
      await this.#service.create({
        title,
        key,
        guide,
        type,
        enum: list,
        category,
      });
      return res.status(HttpCodes.CREATED).json({
        status: 201,
        type: 'CREATED',
        message: OptionMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();
