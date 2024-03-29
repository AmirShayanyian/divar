const { Router } = require('express');
const UserController = require('./user.controller');

const router = Router();

router.get('/profile', UserController.getUserProfile);

module.exports = {
  UserRoutes: router,
};
