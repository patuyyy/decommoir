const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../lib/db.pg');

const router = express.Router();

const User = require('../models/user.model');
const userRepository = require('../repositories/auth.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');
const { configDotenv } = require('dotenv');

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
    console.log(req.body);
    const { name, email, username, password } = req.body;
    try {
        if (!name || !email || !username || !password) {
            return errorResponse(res, 400, "All fields are required");
        }
        const existingUser = await userRepository.getUserByUsername(username);
        if (existingUser) {
            return errorResponse(res, 409, "Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepository.addUser({ name, email, username, password: hashedPassword });
        successResponse(res, 201, "User successfully registered", newUser);
    } catch (error) {
        errorResponse(res, 500, "Failed to register user", error);
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userRepository.getUserByUsername(username);
        const passwordMatch = user ? await bcrypt.compare(password, user.password) : false;
        if (user && passwordMatch) {
            const token = jwt.sign({ id: user.id }, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: '1h' });
            successResponse(res, 200, "Login successful", { token });
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
