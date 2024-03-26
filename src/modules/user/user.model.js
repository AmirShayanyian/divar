const { Schema, Mongoose, model } = require('mongoose');

const userSchema = Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, unique: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);
const OTPSchema = Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
});

const userModel = model('user', userSchema);

module.exports = userModel; 
