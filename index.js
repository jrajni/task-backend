const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
// connect to db
dotenv.config();
mongoose.connect(
    process.env.DB_CONNECT
    , { useUnifiedTopology: true, useNewUrlParser: true }, () => {
        console.log("connected to db")
    })
// Import Router
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')

// Route Middleware
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())


app.use('/api/user', authRouter)
app.use('/api/task', taskRouter)


app.listen(process.env.PORT || 5000, () => {
    console.log("up and running")
})