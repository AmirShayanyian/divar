const { Schema, Types, model } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'category', required: false },
    parents: {
      type: [Types.ObjectId],
      ref: 'category',
      required: false,
      default: [],
    },
  },
  { toJSON: { virtuals: true }, versionKey: false, id: false }
);
CategorySchema.virtual('children', {
  ref: 'category',
  localField: '_id',
  foreignField: 'parent',
});

function autoPopulate(next) {
  this.populate([{ path: 'children' }]);
  next();
}
CategorySchema.pre('find', autoPopulate).pre('findOne', autoPopulate);
const CategoryModel = model('category', CategorySchema);
module.exports = CategoryModel;
