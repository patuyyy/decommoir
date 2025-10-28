const express = require('express');
const deviceController = require('../controllers/device.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Route untuk mendapatkan semua device
router.get('/', deviceController.getAllDevices);

// Route untuk mendapatkan device berdasarkan ID
router.get('/:id', verifyToken, deviceController.getDeviceById);

// Route untuk menambahkan device baru
router.post('/add', verifyToken, deviceController.addDevice);

// Route untuk memperbarui device
// router.put('/devices/:id', verifyToken, deviceController.updateDevice);

// Route untuk menghapus device
// router.delete('/devices/:id', verifyToken, deviceController.deleteDevice);

module.exports = router;