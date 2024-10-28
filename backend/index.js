import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import tourRoute from './src/routes/tours.js'
import userRoute from './src/routes/users.js'
import authRoute from './src/routes/auth.js'
import reviewRoute from './src/routes/reviews.js'
import bookingRoute from './src/routes/bookings.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions ={
    origin: true,
    credentials: true
}

//database connection
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log('Database connected');
    } catch (err) {
        console.error(err)
    }
}

//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)

app.listen(port, ()=> {
    connect();
    console.log('server listening on port', port);
})    