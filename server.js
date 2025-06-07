require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const reserveRoutes = require('./src/routes/reservation.route')
const restauRoutes = require('./src/routes/restaurant.route')
const tableRoutes = require('./src/routes/table.route')
const authRoutes = require('./src/routes/auth.route')
const path = require('path');
const pagesRouter = require('./src/routes/pages')

app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.json())
app.use(express.static('public'))

app.use('/', pagesRouter)

app.use('/reserve', reserveRoutes)
app.use('/restau', restauRoutes)
app.use('/table', tableRoutes)
app.use('/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.render('landing')
// })

connectDB()

app.listen(3000, () => {
    console.log("Server running")
})