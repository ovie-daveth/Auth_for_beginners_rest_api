const express = require('express');
const cors = require('cors');
require("dotenv").config();
const route = require('./routes/userRoutes')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// initialize the express app
const app = express();

//middlewares
app.use(express.json()); // allows the readiin of json requests
app.use(cors()); // prevent the cross origin errors that occur when passin request between different ip adddres
app.use(cookieParser()); // hrlp with jwt tracking for aunthentication requests

//mongodb connection
const uri = process.env.MONGODB_URI
mongoose.connect(uri).then(()=> {
    console.log('mongodb connected');
}).catch((err)=> console.log(`error connecting withmongodb: ${err}`));

// route middleware
app.use('/', route);

// a test route to test, prints to the client
app.get("/api/", (req, res) => {
    res.status(200).json({success: true, message: "ok, working now"})
})




const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Port ${PORT} listening now`)
})