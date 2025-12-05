const SensorData = require('../models/sensor.model.js');
require('dotenv').config();

async function blynkWebhook(req, res) {
    const { pin, value } = req.body;
    try {
        let type;
        if (pin === "V0") type = "temperature";
        else if (pin === "V1") type = "humidity";
        else if (pin === "V2") type = "switch";

        const formattedValue = (type === "switch") ? Boolean(Number(value)) : Number(value);

        await SensorData.create({
            type,
            value: formattedValue
        });

        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getLatestSensorData(req, res) {
    try {
        const temperature = await SensorData.find({ type: "temperature" }).sort({ timestamp: -1 }).limit(50);
        const humidity = await SensorData.find({ type: "humidity" }).sort({ timestamp: -1 }).limit(50);
        const switchStatus = await SensorData.find({ type: "switch" }).sort({ timestamp: -1 }).limit(1);

        res.json({
            temperature,
            humidity,
            switch: switchStatus[0] || { value: false, timestamp: new Date() }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    blynkWebhook,
    getLatestSensorData
};