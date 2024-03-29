const { Schema, Mongoose, model } = require('mongoose');

const OTPSchema = Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
});
const userSchema = Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, unique: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const userModel = model('user', userSchema);

module.exports = userModel;
