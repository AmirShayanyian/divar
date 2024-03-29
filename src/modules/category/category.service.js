const autoBind = require('auto-bind');
const CategoryModel = require('./category.model');

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async create(categoryDto) {}
  async find() {
    const categories = this.#model.find();
    return categories;
  }
}

module.exports = CategoryService;
