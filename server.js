require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const reserveRoutes = require('./src/routes/reservation.route')
const restauRoutes = require('./src/routes/restaurant.route')
const tableRoutes = require('./src/routes/table.route')
const authRoutes = require('./src/routes/auth.route')

app = express()
app.use(express.json())

//routes
app.use('/reserve', reserveRoutes)
app.use('/restau', restauRoutes)
app.use('/table', tableRoutes)
app.use('/auth', authRoutes);

connectDB()

app.listen(3000, () => {
    console.log("Server running")
})