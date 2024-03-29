const { Schema, Types, model } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Category', required: false },
    parents: {
      type: [Types.ObjectId],
      ref: 'Category',
      required: false,
      default: [],
    },
  },
  { toJSON: { virtuals: true }, versionKey: false, id: false }
);
CategorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
});
const CategoryModel = model('category', CategorySchema);
module.exports = CategoryModel;
