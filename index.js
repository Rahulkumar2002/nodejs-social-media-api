const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const userAuth = require('./routes/auth');
const postRoute = require('./routes/posts');
const app = express();
const port = 8800;


dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB");
});

//Middle ware

//Use to hide crutial data in our http request.
app.use(helmet())
//Use to parse our http response.
app.use(express.json())
//Gives detail about http request and response.
app.use(morgan("common"))


app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/posts", postRoute);
app.listen(port, () => {
    console.log(`Our server is running at localhost:${port}`);
});