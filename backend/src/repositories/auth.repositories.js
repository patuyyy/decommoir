const pool = require('../config/db.pg');

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
    const query = 'INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, username, password];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function updateUser(id, data) {
    const { name, email, username, photo_url } = data;

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
    if (photo_url) {
        fields.push(`photo_url = $${index++}`);
        values.push(photo_url);
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

async function updateUserRole(id, role) {
    const query = `
    UPDATE users 
    SET role = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING id, name, email, username, role, created_at, updated_at
  `;
    const values = [role, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    await pool.query(query, values);
}


module.exports = {
    getUserByUsername,
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    updatePassword,
    updateUserRole,
    deleteUser
};