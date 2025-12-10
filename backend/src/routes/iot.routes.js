const express = require('express');
const iotController = require('../controllers/iot.controller');
const verifyToken = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const router = express.Router();

// Route blynk webhook
router.post('/blynk-webhook', iotController.blynkWebhook);

// Route untuk menampilkan data sensor di client
router.get('/latest50/:deviceId', iotController.getLatest50SensorData);

// Route untuk menampilkan data sensor di client
router.get('/latest', iotController.getLatestSensorData);

// Route untuk menampilkan data sensor di client
router.get('/latest/:deviceId', iotController.getLatestSensorDataById);

// Route untuk mengupload foto sampah
router.post('/waste-upload', upload.single('image'), iotController.wasteHandler);

module.exports = router;
