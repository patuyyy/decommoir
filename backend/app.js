const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')

const app = express()

require('dotenv').config()

app.use(cors())
app.use('/api/auth', authRouter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})

