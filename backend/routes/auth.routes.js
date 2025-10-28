const express = require('express');
const userController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Route untuk mendapatkan semua user (hanya untuk testing)
router.get('/users', userController.getAllUsers);

// Route untuk mendapatkan user berdasarkan username
router.get('/users/:username', verifyToken, userController.getUserByUsername);

// Route untuk mendapatkan profil user saat ini
router.get('/profile', verifyToken, userController.getProfile); 

// Route untuk registrasi user baru
router.post('/register', userController.registerUser);

// Route untuk login user
router.post('/login', userController.loginUser);

// Route untuk update user
router.put('/update', verifyToken, userController.updateUser);

// Route untuk ganti password user
router.put('/update/password', verifyToken, userController.changePassword);

// Route untuk mengubah peran user (hanya untuk admin)
router.put('/update/role/:id', verifyToken, userController.updateUserRole);

// Route untuk menghapus user (hanya untuk admin)
router.delete('/delete/:id', verifyToken, userController.deleteUser);

module.exports = router;