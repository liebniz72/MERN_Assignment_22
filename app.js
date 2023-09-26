const express = require("express");
const app = new express();
const helmet = require('helmet');
const router = require("./src/routes/api");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require("dotenv").config({
  path: './config.env',
});
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit =require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const multer = require('multer');
const hpp = require('hpp');
var validator = require('validator');



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(hpp());


// Request Rate Limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	
})

app.use(limiter)


let URI =
  "mongodb+srv://vercel-admin-user:Yu8KMp08uwqySq0B@cluster0.y9cyf.mongodb.net/test";


mongoose
  .connect(URI)
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => console.log(err));

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
