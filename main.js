const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongooseConnection = require('./src/config/mongoose.config');
const swaggerConfig = require('./src/config/swagger.config');
async function main() {
  const app = express();
  const port = process.env.PORT || 3000;
  await mongooseConnection();
  swaggerConfig(app);
  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

main();
