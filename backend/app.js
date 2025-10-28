const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')
const deviceRouter = require('./routes/device.routes')

const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/devices', deviceRouter)

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})

module.exports = app