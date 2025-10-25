const express = require('express');
const pool = require('../lib/db.pg');

const router = express.Router();

async function getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function addUser({ name, email, username, password }) {
    const query = 'INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, username, password];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const res = await pool.query(query);
    return res.rows;
}

module.exports = {
    getUserByUsername,
    addUser,
    getAllUsers,
};