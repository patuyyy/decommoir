const pool = require('../config/db.pg');

async function addWasteLog({ device_id, image_url, taken_at }) {
    const query = 'INSERT INTO food_waste_logs (device_id, image_url, taken_at) VALUES ($1, $2, $3) RETURNING *';
    const values = [device_id, image_url, taken_at];
    const res = await pool.query(query, values);
    return res.rows[0];
}

module.exports = {
    addWasteLog
}