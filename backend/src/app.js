const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth.routes')
const deviceRouter = require('./routes/device.routes')
const schoolRouter = require('./routes/school.routes')
const iotRouter = require('./routes/iot.routes')

const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: '*' }))
app.use('/api/auth', authRouter)
app.use('/api/devices', deviceRouter)
app.use('/api/schools', schoolRouter)
app.use('/api/iot', iotRouter)

const MONGODB_URI = process.env.MONGODB_URI;

// Connect ke MongoDB
mongoose.connect(MONGODB_URI).then(() => console.log("MongoDB connected")).catch(err => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})

module.exports = app