const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const userModel = require('../../modules/user/user.model');
const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token) {
      throw new createHttpError.Unauthorized('Login into your account.');
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (data.userId) {
      const user = await userModel
        .findById(data.userId, {
          access_token: 0,
          otp: 0,
          __v: 0,
          updatedAt: 0,
          verifiedMobile: 0,
          accessToken: 0,
        })
        .lean();
      if (!user) throw new createHttpError.NotFound('User not found');
      req.user = user;
      console.log('sad');
      next();
    }
    throw new createHttpError.Unauthorized('Token is invalid');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthGuard: Authorization,
};
