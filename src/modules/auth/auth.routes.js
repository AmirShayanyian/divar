const { Router } = require('express');
const AuthController = require('./auth.controller');
const { AuthGuard } = require('../../common/guard/auth.guard');

const router = Router();

router.post('/send-otp', AuthController.sendOTP);
router.post('/check-otp', AuthController.checkOTP);
router.get('/logout', AuthGuard, AuthController.logout);

module.exports = {
  AuthRoutes: router,
};
