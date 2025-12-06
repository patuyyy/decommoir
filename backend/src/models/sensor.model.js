const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  pin: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);