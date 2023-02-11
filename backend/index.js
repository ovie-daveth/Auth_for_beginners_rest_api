/* Initialize express */
const express = require('express');
const app = express(); /* Connect App to express */

app.get('/', (req, res) => {
    res.json('test ok')
})



/* DECLARE location for running backend */
app.listen(4000)