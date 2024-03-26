const { Router } = require('express');
const { AuthRoutes } = require('./modules/auth/auth.routes');

const router = Router();

router.use('/auth', AuthRoutes);

module.exports = router;
