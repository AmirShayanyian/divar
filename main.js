const express = require('express');
const mainRouter = require('./src/index.routes');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const mongooseConnection = require('./src/config/mongoose.config');
const swaggerConfig = require('./src/config/swagger.config');
const NotFoundHandler = require('./src/common/exception/not-found.handler');
const GlobalExceptionHandler = require('./src/common/exception/global-exception.handler');
const cookieParser = require('cookie-parser');
async function main() {
  const app = express();
  const port = process.env.PORT || 3000;
  await mongooseConnection();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  app.set('layout', './layouts/panel/main.ejs');

  swaggerConfig(app);
  app.use(mainRouter);
  NotFoundHandler(app);
  GlobalExceptionHandler(app);
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

main();
