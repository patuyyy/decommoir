const pool = require('../config/db.pg');

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

async function addDevice({ school_id, device_size, deployed_at, last_maintenance }) {
    const query = 'INSERT INTO maggot_devices (school_id, device_size, deployed_at, last_maintenance) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [school_id, device_size, deployed_at, last_maintenance];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function updateDevice(id, data) {
    const { school_id, device_size, deployed_at, last_maintenance } = data;

    const fields = [];
    const values = [];
    let index = 1;
    if (school_id) {
        fields.push(`school_id = $${index++}`);
        values.push(school_id);
    }
    if (device_size) {
        fields.push(`device_size = $${index++}`);
        values.push(device_size);
    }
    if (deployed_at) {
        fields.push(`deployed_at = $${index++}`);
        values.push(deployed_at);
    }
    if (last_maintenance) {
        fields.push(`last_maintenance = $${index++}`);
        values.push(last_maintenance);
    }
    if (fields.length === 0) return null; // gak ada yang diupdate

    const query = `
    UPDATE maggot_devices 
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${index}
    RETURNING *`;
    values.push(id);
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function deleteDevice(id) {
    const query = 'DELETE FROM maggot_devices WHERE id = $1 RETURNING *';
    const values = [id];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function maintenanceDevice(device_id, date) {
    const { last_maintenance } = date;
    const query = `
    UPDATE maggot_devices
    SET last_maintenance = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *`;
    const values = [last_maintenance, device_id];
    const res = await pool.query(query, values);
    return res.rows[0];
}

async function addMaintenanceLog(device_id, data) {
    const { performed_by, maintenance_date, details } = data;
    const query = `
    INSERT INTO maintenance_logs (device_id, maintenance_date, performed_by, details)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const values = [device_id, maintenance_date, performed_by, details];
    const res = await pool.query(query, values);
    return res.rows[0];
}


module.exports = {
    getAllDevices,
    getDeviceById,
    addDevice,
    updateDevice,
    deleteDevice,
    maintenanceDevice,
    addMaintenanceLog,
};
