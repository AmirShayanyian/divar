const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

function swaggerConfig(app) {
  const swaggerDoc = swaggerJsDoc({
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        title: 'divar',
        description: 'this is the divar backend',
        version: '1.0.0',
      },
    },
    apis: [process.cwd() + '/src/modules/**/**.swagger.yaml'],
  });
  
  const swagger = swaggerUi.setup(swaggerDoc);
  app.use('/swagger', swaggerUi.serve, swagger);
}
module.exports = swaggerConfig;
