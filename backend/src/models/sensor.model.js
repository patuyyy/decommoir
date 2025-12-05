const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  type: { type: String, enum: ['temperature', 'humidity', 'switch'], required: true },
  value: mongoose.Schema.Types.Mixed, // number atau boolean
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);