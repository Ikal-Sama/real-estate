const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const listingRouter = require('./routes/listingRoute')
const cookieParser = require('cookie-parser')
const path = require('path')

dbConnect();

app.use(cookieParser());
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})