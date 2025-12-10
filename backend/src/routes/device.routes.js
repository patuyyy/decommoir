const express = require('express');
const deviceController = require('../controllers/device.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Route untuk mendapatkan semua device
router.get('/', deviceController.getAllDevices);

// Route untuk mendapatkan device berdasarkan ID
router.get('/:id', deviceController.getDeviceById);

// Route untuk menambahkan device baru
router.post('/add', deviceController.addDevice);

// Route untuk memperbarui device
router.put('/update/:id', deviceController.updateDevice);

// Route untuk menghapus device
router.delete('/delete/:id', deviceController.deleteDevice);

// Route untuk maintenance device
router.post('/maintenance/:id', deviceController.maintenanceDevice);


module.exports = router;