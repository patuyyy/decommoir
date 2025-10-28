const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const deviceRepository = require('../repositories/device.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');

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

async function maintenanceDevice(req, res) {
    const { id } = req.params;
    const { last_maintenance } = req.body;
    try {
        const maintainedDevice = await deviceRepository.maintenanceDevice(id, last_maintenance);
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
    maintenanceDevice,
};