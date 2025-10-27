const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')

const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/api/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})

module.exports = app