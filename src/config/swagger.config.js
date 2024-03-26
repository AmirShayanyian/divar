const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function swaggerConfig(app) {
  const swaggerDoc = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: 'divar',
        description: 'this is the divar backend',
        version: '1.0.0',
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDoc);
  app.use('/', swaggerUi.serve, swagger);
}
module.exports = swaggerConfig;
