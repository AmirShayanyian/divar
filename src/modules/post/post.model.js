const { Schema, Types } = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'category', required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  coordination: { type: [Number], required: true }, // 52.2134521 , 42.21344532
  images: { type: [String], required: false, default: [] },
});
