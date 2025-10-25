const express = require('express');
const pool = require('../lib/db.pg');
const userController = require('../controllers/auth.controller');

const router = express.Router();

// Route untuk mendapatkan semua user (hanya untuk testing)
router.get('/users', userController.getAllUsers);

// Route untuk mendapatkan user berdasarkan username
router.get('/users/:username', userController.getUserByUsername);

// Route untuk registrasi user baru
router.post('/register', userController.registerUser);

// Route untuk login user
router.post('/login', userController.loginUser);


module.exports = router;