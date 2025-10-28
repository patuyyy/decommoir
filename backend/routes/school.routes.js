const express = require('express');
const schoolController = require('../controllers/school.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Route untuk mendapatkan semua sekolah
router.get('/', schoolController.getAllSchools);

// Route untuk mendapatkan sekolah berdasarkan ID
router.get('/:id', verifyToken, schoolController.getSchoolById);

// Route untuk menambahkan sekolah baru
router.post('/add', verifyToken, schoolController.addSchool);

// Route untuk memperbarui sekolah
// router.put('/schools/:id', verifyToken, schoolController.updateSchool);

// Route untuk menghapus sekolah
// router.delete('/schools/:id', verifyToken, schoolController.deleteSchool);

module.exports = router;