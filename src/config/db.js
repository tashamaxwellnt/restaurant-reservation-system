const mongoose = require('mongoose')

const connectDB = () =>  {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log('Database connection successful')
    }).catch((error) => {
        console.log('Database connection failed')
    })     
}

module.exports = connectDB