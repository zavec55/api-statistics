const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Statistics',
      version: '1.0.0',
      description: 'API for tracking endpoint statistics',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
module.exports = { specs };
