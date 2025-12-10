const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  device_id: { type: String, required: true },
  type: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed, // number atau boolean
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);