const express = require('express');
const iotController = require('../controllers/iot.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Route blynk webhook
router.post('/blynk-webhook', iotController.blynkWebhook);

// Route untuk menampilkan data sensor di client
router.get('/latest', iotController.getLatestSensorData);

module.exports = router;
