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
      const {
        title,
        key,
        guide,
        type,
        enum: list,
        category,
        required,
      } = req.body;
      await this.#service.create({
        title,
        key,
        guide,
        type,
        enum: list,
        category,
        required,
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
  async update(req, res, next) {
    try {
      const {id} = req.params;
      const {
        title,
        key,
        guide,
        type,
        enum: list,
        category,
        required,
      } = req.body;
      const result = await this.#service.update(id, {
        title,
        key,
        guide,
        type,
        enum: list,
        category,
        required,
      });
      return res.status(HttpCodes.OK).json({
        status: 200,
        type: 'OK',
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const option = await this.#service.findById(id);
      return res.json({
        status: 200,
        type: 'OK',
        data: option,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const option = await this.#service.findByCategoryId(categoryId);
      return res.json({
        status: 200,
        type: 'OK',
        data: option,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByCategorySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const option = await this.#service.findByCategorySlug(slug);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
  async removeById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.#service.removeById(id);
      return res.json({
        status: 200,
        type: 'OK',
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();
