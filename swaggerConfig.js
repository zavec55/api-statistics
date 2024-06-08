const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Statistics',
      version: '1.0.0',
      description: 'Statistics API',
    },
  },
  apis: ['./routes/statistics.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
