const express = require('express');
const deviceController = require('../controllers/device.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Route untuk mendapatkan semua device
router.get('/', verifyToken, deviceController.getAllDevices);

// Route untuk mendapatkan device berdasarkan ID
router.get('/:id', verifyToken, deviceController.getDeviceById);

// Route untuk menambahkan device baru
router.post('/add', verifyToken, deviceController.addDevice);

// Route untuk memperbarui device
router.put('/update/:id', verifyToken, deviceController.updateDevice);

// Route untuk menghapus device
router.delete('/delete/:id', verifyToken, deviceController.deleteDevice);

// Route untuk maintenance device
router.post('/maintenance/:id', verifyToken, deviceController.maintenanceDevice);


module.exports = router;