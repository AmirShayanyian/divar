const { Router } = require('express');
const { AuthRoutes } = require('./modules/auth/auth.routes');
const { AuthGuard } = require('./common/guard/auth.guard');
const { UserRoutes } = require('./modules/user/user.routes');

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/user', AuthGuard, UserRoutes);

module.exports = router;
