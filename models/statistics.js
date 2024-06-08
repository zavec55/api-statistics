const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
  },
  calls: {
    type: Number,
    default: 1,
  },
  lastCalled: {
    type: Date,
    default: Date.now,
  },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
