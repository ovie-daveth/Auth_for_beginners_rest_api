const express = require('express');
const cors = require('cors');
require("dotenv").config();
const route = require('./routes/userRoutes')

// initialize the express app
const app = express();

//middlewares
app.use(express.json()); // allows the readiin of json requests
app.use(cors()); // prevent the cross origin errors that occur when passin request between different ip adddres

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


console.log("Hello world!");