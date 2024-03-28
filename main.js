const express = require('express');
const mainRouter = require('./src/index.routes');
const dotenv = require('dotenv');
dotenv.config();
const mongooseConnection = require('./src/config/mongoose.config');
const swaggerConfig = require('./src/config/swagger.config');
const  NotFoundHandler  = require('./src/common/exception/not-found.handler');
const GlobalExceptionHandler = require('./src/common/exception/global-exception.handler');
async function main() {
  const app = express();
  const port = process.env.PORT || 3000;
  await mongooseConnection();
  swaggerConfig(app);

  app.use(mainRouter);
  NotFoundHandler(app);
  GlobalExceptionHandler(app)
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

main();
