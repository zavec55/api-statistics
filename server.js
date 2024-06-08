const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { specs } = require('./swaggerConfig');
const statisticsRouter = require('./routes/statistics');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;  // Ali vaš privzeti port
const mongoUri = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/statistics', statisticsRouter);

app.listen(port, () => {
  console.log(`Statistics service is running on port ${port}`);
});
