const express = require('express');
const pool = require('../lib/db.pg');

const router = express.Router();


async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const res = await pool.query(query);
    return res.rows;
}

async function getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const res = await pool.query(query, values);
    return res.rows[0];
}
async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function addUser({ name, email, username, password }) {
    console.log(name);
    const query = 'INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, username, password];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function updateUser(id, data) {
    const { name, email, username } = data;

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (email) {
        fields.push(`email = $${index++}`);
        values.push(email);
    }
    if (username) {
        fields.push(`username = $${index++}`);
        values.push(username);
    }


    if (fields.length === 0) return null; // gak ada yang diupdate

    const query = `
    UPDATE users 
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${index}
    RETURNING id, name, email, username, role, created_at, updated_at
  `;

    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
}

async function updatePassword(id, password) {
    console.log(password);
    const query = `
    UPDATE users 
    SET password = $1, updated_at = NOW()
    WHERE id = $2
  `;
    const values = [password, id];
    await pool.query(query, values);
}


module.exports = {
    getUserByUsername,
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    updatePassword
};