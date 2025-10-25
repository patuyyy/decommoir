const express = require('express');
const pool = require('../lib/db.pg');

const router = express.Router();

const User = require('../models/user.model');
const userRepository = require('../repositories/auth.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');

async function getAllUsers(req, res) {
  try {
    const user = await userRepository.getAllUsers();
    successResponse(res, 200, "User successfully retrieved", user);
} catch (error) {
    errorResponse(res, 500, "Failed to retrieve users", error);
  }
}

async function getUserByUsername(req, res) {
  const { username } = req.params;
  try {
    const user = await userRepository.getUserByUsername(username);
    if (user) {
      successResponse(res, 200, "User successfully retrieved", user);
    } else {
      errorResponse(res, 404, "User not found");
    }
  } catch (error) {
    errorResponse(res, 500, "Failed to retrieve user", error);
  }
}

async function registerUser(req, res) {
  const { email, username, password } = req.body;
  try {
    const newUser = await userRepository.addUser({ email, username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Gagal registrasi user' });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userRepository.getUserByUsername(username);
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login berhasil' });
    } else {
      res.status(401).json({ error: 'Username atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal melakukan login' });
  }
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  registerUser,
  loginUser,
};
