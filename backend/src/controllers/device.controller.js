const express = require('express');
require('dotenv').config();

const router = express.Router();

const deviceRepository = require('../repositories/device.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');
const e = require('express');

async function getAllDevices(req, res) {
    try {
        const devices = await deviceRepository.getAllDevices();
        successResponse(res, 200, 'Devices successfully retrieved', devices);
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch devices');
    }
}

async function getDeviceById(req, res) {
    const { id } = req.params;
    try {
        const device = await deviceRepository.getDeviceById(id);
        if (device) {
            successResponse(res, 200, 'Device successfully retrieved', device);
        } else {
            errorResponse(res, 404, 'Device not found');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch device');
    }
}

async function addDevice(req, res) {
    const { school_id, device_size, deployed_at, last_maintenance } = req.body;
    try {
        if (req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Forbidden: You do not have permission to add a device');
        }
        if (!school_id || !device_size || !deployed_at) {
            return errorResponse(res, 400, 'Missing required fields');
        }
        const newDevice = await deviceRepository.addDevice({ school_id, device_size, deployed_at, last_maintenance });
        successResponse(res, 201, 'Device successfully added', newDevice);
    } catch (error) {
        errorResponse(res, 500, 'Failed to add device');
    }
}

async function updateDevice(req, res) {
    const { id } = req.params;
    const { school_id, device_size, deployed_at, last_maintenance } = req.body;
    try {
        if (req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Forbidden: You do not have permission to update a device');
        }
        const updatedDevice = await deviceRepository.updateDevice(id, { school_id, device_size, deployed_at, last_maintenance });
        if (updatedDevice) {
            successResponse(res, 200, 'Device successfully updated', updatedDevice);
        } else {
            errorResponse(res, 404, 'Device not found');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to update device');
    }
}

async function deleteDevice(req, res) {
    const { id } = req.params;
    try {
        const deletedDevice = await deviceRepository.deleteDevice(id);
        if (deletedDevice) {
            successResponse(res, 200, 'Device successfully deleted', deletedDevice);
        } else {
            errorResponse(res, 404, 'Device not found');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete device');
    }
}

async function deleteDevice(req, res) {
    const { id } = req.params;
    try {
        const deletedDevice = await deviceRepository.deleteDevice(id);
        if (deletedDevice) {
            successResponse(res, 200, 'Device successfully deleted', deletedDevice);
        } else {
            errorResponse(res, 404, 'Device not found');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete device');
    }
}

async function maintenanceDevice(req, res) {
    const { device_id } = req.params;
    const user_id  = req.user.id;
    const { date, details } = req.body;
    try {
        const maintainedDevice = await deviceRepository.maintenanceDevice(device_id, { last_maintenance: date });
        const maintenanceLog = await deviceRepository.addMaintenanceLog(device_id,  { performed_by: user_id , maintenance_date: date, details: details});
        if (maintainedDevice) {
            successResponse(res, 200, 'Device maintenance date successfully updated', maintainedDevice);
        } else {
            errorResponse(res, 404, 'Device not found');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to update maintenance date');
    }
}



module.exports = {
    getAllDevices,
    getDeviceById,
    addDevice,
    updateDevice,
    deleteDevice,
    maintenanceDevice,
};