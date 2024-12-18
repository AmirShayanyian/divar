const autoBind = require('auto-bind');
const OptionModel = require('./option.model');
const createHttpError = require('http-errors');
const OptionMessage = require('./option.message');
const { isValidObjectId, Types } = require('mongoose');
const slugify = require('slugify');
const CategoryService = require('../category/category.service');

class OptionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = new CategoryService();
  }
  async create(optionDto) {
    const category = await this.checkExistById(optionDto.category);
    if (!optionDto.required) optionDto.required = false;
    optionDto.category = category;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: '_',
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.category, optionDto.key);
    if (optionDto.enum) {
      optionDto.enum = optionDto.enum.split(',');
    } else if (Array.isArray(optionDto.enum)) optionDto.enum = [];
    const option = await this.#model.create(optionDto);
    return option;
  }
  async find() {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $addFields: {
          categorySlug: '$category.slug',
          categoryName: '$category.name',
          categoryIcon: '$category.icon',
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
    ]);
    return options;
  }
  async findById(id) {
    return await this.#model
      .findById(id, { __v: 0 }, { __id: -1 })
      .populate([{ path: 'category', select: { name: 1, slug: 1 } }]);
  }
  async findByCategoryId(categoryId) {
    const option = await this.#model
      .findOne({ category: categoryId }, { __v: 0 }, { __id: -1 })
      .populate([{ path: 'category', select: { name: 1, slug: 1 } }]);
    return option;
  }
  async findByCategorySlug(slug) {
    const option = await this.#model.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $addFields: {
          categorySlug: '$category.slug',
          categoryName: '$category.name',
          categoryIcon: '$category.icon',
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
    return option;
  }
  async removeById(id) {
    const option = await this.checkExistById(id);
    if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
    const result = await this.#model.deleteOne({ _id: id });
    return result;
  }
  async checkExistById(id) {
    const category = await this.#categoryService.checkExistById(id);
    if (!category) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return category;
  }
  async alreadyExistByCategoryAndKey(category, key) {
    const isExist = await this.#model.findOne({ category, key });
    if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }
  async update(id, optionDto) {
    const existOption = await this.findById(id);
    if (optionDto.category && isValidObjectId(optionDto.category)) {
      const category = await this.checkExistById(optionDto.category);
      optionDto.category = category._id;
    } else {
      delete optionDto.category;
    }
    if (optionDto.slug) {
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: '_',
        lower: true,
      });
      let categoryId = existOption.category;
      if (optionDto.category) {
        categoryId = optionDto.category;
      }
      await this.alreadyExistByCategoryAndKey(
        optionDto.category,
        optionDto.key
      );
    }
    optionDto.category = existOption.category;
    if (!optionDto.required) optionDto.required = false;
    if (optionDto.enum) {
      optionDto.enum = optionDto.enum.split(',');
    }
    const result = await this.#model.updateOne(
      { _id: id },
      { $set: optionDto }
    );
    return result;
  }
}

module.exports = OptionService;
