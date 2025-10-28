const pool = require('../lib/db.pg');

async function getAllScools() {
    const query = 'SELECT * FROM schools';
    const res = await pool.query(query);
    return res.rows;
}

async function getSchoolById(id) {
    const query = 'SELECT * FROM schools WHERE id = $1';
    const values = [id];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function addSchool({ name, address }) {
    const query = 'INSERT INTO schools (name, address) VALUES ($1, $2) RETURNING *';
    const values = [name, address];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function updateSchool(id, data) {
    const { name, address } = data;

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (address) {
        fields.push(`address = $${index++}`);
        values.push(address);
    }

    if (fields.length === 0) return null; // gak ada yang diupdate

    const query = `
    UPDATE schools 
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${index}
    RETURNING id, name, address, created_at, updated_at
  `;

    values.push(id);

    const res = await pool.query(query, values);
    return res.rows[0];
}

module.exports = {
    getAllScools,
    getSchoolById,
    addSchool,
};