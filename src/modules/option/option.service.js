const autoBind = require('auto-bind');
const OptionModel = require('./option.model');
const createHttpError = require('http-errors');
const OptionMessage = require('./option.message');
const { isValidObjectId, Types } = require('mongoose');
const slugify = require('slugify');

class OptionService {
  #model;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryModel = OptionModel;
  }
  async create(optionDto) {
    const category = await this.checkExistById(optionDto.category);
    optionDto.category = category;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: '_',
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.category, optionDto.key);
    if (optionDto.enum && typeof optionDto.num === 'string') {
      optionDto.enum = optionDto.enum.split(',');
    } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];
    const option = await this.#model.create(optionDto);
  }
  async find() {}
  async checkExistById(id) {
    const category = await this.#categoryModel.findById(id);
    if (!category) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return category;
  }
  async alreadyExistByCategoryAndKey(category, key) {
    const isExist = await this.#model.findOne({ category, key });
    if (!isExist)
      throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }
}

module.exports = OptionService;
