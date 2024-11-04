const express = require('express')
const app = new express()
const router = require('./src/routes/api')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


// security Middleware Import

const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')


// security Middleware Implementation

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter);

app.use(bodyParser.json())
// mongodb connection

let URI = "mongodb://127.0.0.1:27017/Todo";
let OPTION = { user: '', pass: '', autoIndex: true };
mongoose.connect(URI, OPTION)
    .then(() => {
        console.log("Connection Success");
    })
    .catch((error) => {
        console.error("Connection Error:", error);
    });



//endpoint
app.use("/api/v1", router)

app.use("*", (req, res) => {
    res.status(404).json({ status: "Failed", data: "Route Not Found" })
})


module.exports = app
