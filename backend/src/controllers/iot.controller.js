const SensorData = require('../models/sensor.model.js');
const { successResponse, errorResponse } = require('../utils/baseResponse');
const { cloudinary } = require('../config/db.cloudinary');
const iotRepository = require('../repositories/iot.repositories');
const fs = require('fs');
require('dotenv').config();


async function blynkWebhook(req, res) {
    const { device_id, type, value } = req.body;
    try {

        const sensor = await SensorData.create({ device_id, type, value })

        req.app.locals.broadcast({
            device_id: sensor.device_id,
            type: sensor.type,
            value: sensor.value,
            timestamp: sensor.timestamp
        })

        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getLatest50SensorData(req, res) {
    const deviceId = req.params.deviceId;
    try {
        const [temperature, humidity, airQuality] = await Promise.all([
            SensorData.find({ type: 'v1', device_id: deviceId }).sort({ timestamp: -1 }).limit(50),
            SensorData.find({ type: 'v2', device_id: deviceId }).sort({ timestamp: -1 }).limit(50),
            SensorData.find({ type: 'v5', device_id: deviceId }).sort({ timestamp: -1 }).limit(50)
        ])

        const formatData = arr => arr.map(d => ({ device_id: d.device_id, type: d.type, value: d.value, time: d.timestamp.toISOString() })).reverse();
        res.json({ temperature: formatData(temperature), humidity: formatData(humidity), airQuality: formatData(airQuality) })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function getLatestSensorData(req, res) {
    try {
        const latestReadings = await SensorData.aggregate([
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: { device_id: "$device_id", type: "$type" },
                    latestDoc: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestDoc" }
            }
        ]);
        
        const formatData = (item) => ({
            device_id: item.device_id,
            type: item.type,
            value: item.value,
            time: item.timestamp.toISOString()
        });

        const temperature = latestReadings
            .filter(item => item.type === 'v1')
            .map(formatData);

        const humidity = latestReadings
            .filter(item => item.type === 'v2')
            .map(formatData);

        const airQuality = latestReadings
            .filter(item => item.type === 'v5')
            .map(formatData);

        res.json({ 
            temperature, 
            humidity, 
            airQuality 
        });

    } catch (err) {
        console.error("Error in getLatestSensorData:", err);
        res.status(500).json({ error: err.message });
    }
}

async function getLatestSensorDataById(req, res) {
    try {
        const deviceId = req.params.deviceId;
        const latestReadings = await SensorData.aggregate([
            { $match: { device_id: deviceId } },
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: { device_id: "$device_id", type: "$type" },
                    latestDoc: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestDoc" }
            }
        ]);

        const formatData = (item) => ({
            device_id: item.device_id,
            type: item.type,
            value: item.value,
            time: item.timestamp.toISOString()
        });

        const temperature = latestReadings
            .filter(item => item.type === 'v1')
            .map(formatData);

        const humidity = latestReadings
            .filter(item => item.type === 'v2')
            .map(formatData);

        const airQuality = latestReadings
            .filter(item => item.type === 'v5')
            .map(formatData);

        res.json({
            temperature,
            humidity,
            airQuality
        });
    } catch (err) {
        console.error("Error in getLatestSensorDataById:", err);
        res.status(500).json({ error: err.message });
    }
}

async function wasteHandler(req, res) {
    try {
        console.log("Uploaded file:", req.get('Date'));
        req._startTime = Date.now().toString();
        console.log("Start time set to:", req._startTime);
        if (!req.file) {
            return errorResponse(res, 400, 'No file uploaded');
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'decommoir/food_waste_photos',
            public_id: `${req._startTime}_photo`,
            overwrite: true,
            resource_type: 'image',
        });

        const wasteLog = await iotRepository.addWasteLog({ device_id: req.body.device_id, image_url: result.secure_url, taken_at: new Date() });

        fs.unlinkSync(req.file.path);

        successResponse(res, 200, 'Photo successfully updated', { wasteLog });
    } catch (error) {
        errorResponse(res, 500, 'Failed to upload waste photo', error);
    }
}

module.exports = {
    blynkWebhook,
    getLatest50SensorData,
    wasteHandler,
    getLatestSensorData,
    getLatestSensorDataById
};