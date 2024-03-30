const { Schema, Types, model } = require('mongoose');

const OptionSchema = new Schema({
  title: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, enum: ['string', 'array', 'boolean', 'number'] },
  enum: { type: Array, default: [] },
  guide: { type: String, required: false },
  required: { type: Boolean, required: false },
  category: { type: Types.ObjectId, ref: 'category', required: true },
});

const OptionModel = model('option', OptionSchema);
module.exports = OptionModel;
