const { Router } = require('express');
const { AuthRoutes } = require('./modules/auth/auth.routes');
const { AuthGuard } = require('./common/guard/auth.guard');
const { UserRoutes } = require('./modules/user/user.routes');
const { CategoryRoutes } = require('./modules/category/category.routes');
const { OptionRoutes } = require('./modules/option/option.routes');

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/user', AuthGuard, UserRoutes);
router.use('/category', CategoryRoutes);
router.use('/option', OptionRoutes);

module.exports = router;
