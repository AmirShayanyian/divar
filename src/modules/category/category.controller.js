const autoBind = require('auto-bind');
const CategoryService = require('./category.service');
const HttpCodes = require('http-codes');
const CategoryMessage = require('./category.message');
class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = new CategoryService();
  }
  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      await this.#service.create({ name, icon, slug, parent });
      return res.status(HttpCodes.CREATED).json({
        message: CategoryMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
