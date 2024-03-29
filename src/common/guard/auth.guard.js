const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const userModel = require('../../modules/user/user.model');
const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookie?.access_token;
    if (!token)
      return new createHttpError.Unauthorized('Login into your account.');
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof data === 'object' && data.id) {
      const user = await userModel
        .findById(data.id, {
          access_token: 0,
          otp: 0,
        })
        .lean();
      if (!user) return new createHttpError.NotFound('User not found');
      req.user = user;
      return next();
    }
    return new createHttpError.Unauthorized('Token is invalid');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AuthGuard: Authorization,
};
