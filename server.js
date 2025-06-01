require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')

const reserveRoute = require('./src/routes/reservation.route')
const restauRoute = require('./src/routes/restaurant.route')
const tableRoute = require('./src/routes/table.route')

app = express()

app.use(express.json())
// app.use('/api/reserve', reserveRoute)
// app.use('/api/restau', restauRoute)
// app.use('/api/table', tableRoute)

connectDB()

app.listen(3000, () => {
    console.log("Server running")
})