const SensorData = require('../models/sensor.model.js');
const { successResponse, errorResponse } = require('../utils/baseResponse');
const { cloudinary } = require('../config/db.cloudinary');
const fs = require('fs');
require('dotenv').config();


async function blynkWebhook(req, res) {
    const { pin, value } = req.body;
    try {
        let type;
        if (pin === "V0") type = "temperature";
        else if (pin === "V1") type = "humidity";
        else if (pin === "V2") type = "switch";

        const formattedValue = (type === "switch") ? Boolean(Number(value)) : Number(value);

        const sensor = await SensorData.create({ type, value: formattedValue })


        await SensorData.create({
            type,
            value: formattedValue
        });
        req.app.locals.broadcast({
            type: sensor.type,
            value: sensor.value,
            timestamp: sensor.timestamp
        })

        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getLatestSensorData(req, res) {
    try {
        const [temperature, humidity, switchData] = await Promise.all([
            SensorData.find({ type: 'temperature' }).sort({ timestamp: -1 }).limit(50),
            SensorData.find({ type: 'humidity' }).sort({ timestamp: -1 }).limit(50),
            SensorData.find({ type: 'switch' }).sort({ timestamp: -1 }).limit(50)
        ])

        const formatData = arr => arr.map(d => ({ value: d.value, time: d.timestamp.toISOString() })).reverse();
        res.json({ temperature: formatData(temperature), humidity: formatData(humidity), switch: formatData(switchData) })

    } catch (err) {
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

        fs.unlinkSync(req.file.path);

        successResponse(res, 200, 'Photo successfully updated', { photo_url: result.secure_url });
    } catch (error) {
        errorResponse(res, 500, 'Failed to upload waste photo', error);
    }
}

module.exports = {
    blynkWebhook,
    getLatestSensorData,
    wasteHandler
};