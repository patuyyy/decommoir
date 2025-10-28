const pool = require('../lib/db.pg');

async function getAllDevices() {
    const query = 'SELECT * FROM maggot_devices';
    const res = await pool.query(query);
    return res.rows;
}

async function getDeviceById(id) {
    const query = 'SELECT * FROM maggot_devices WHERE id = $1';
    const values = [id];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function addDevice({ school_id, device_type, deployed_at, last_maintenance }) {
    const query = 'INSERT INTO maggot_devices (school_id, device_size, deployed_at, last_maintenance) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [school_id, device_type, deployed_at, last_maintenance];
    const res = await pool.query(query, values);
    return res.rows[0];
}

module.exports = {
    getAllDevices,
    getDeviceById,
    addDevice,
};
