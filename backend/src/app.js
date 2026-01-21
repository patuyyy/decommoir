const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');             
const { WebSocketServer } = require('ws');

require('dotenv').config();

const authRouter = require('./routes/auth.routes');
const deviceRouter = require('./routes/device.routes');
const schoolRouter = require('./routes/school.routes');
const iotRouter = require('./routes/iot.routes');
const healtRouter = require('./routes/health.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://decommoir.online',
    credentials: true,
}));

app.use('/api/auth', authRouter);
app.use('/api/devices', deviceRouter);
app.use('/api/schools', schoolRouter);
app.use('/api/iot', iotRouter);
app.use('/api/health', healtRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const server = http.createServer(app);

const wss = new WebSocketServer({ 
  server,
  path: '/ws'
});

console.log("WebSocket initialized...");

app.locals.broadcast = (data) => {
    const payload = JSON.stringify(data);
    console.log("Broadcasting:", data);

    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(payload);
        }
    });
};

wss.on('connection', (ws) => {
    console.log('WS client connected');

    ws.send(JSON.stringify({ message: "Connected to WebSocket" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP + WebSocket running at http://localhost:${PORT}`);
});

wss.on('connection', () => {
    console.log(">> Frontend WebSocket connected");
});


module.exports = app;
