const express = require('express');
const router = express.Router();
const client = require('../database/db');

/*
 * Sample ping API.
 */

router.get('/', function (req, res) {
    res.json({ message: 'hooray! ProjectExecutionOut API Calling !!!' });
});


/*
 * GET Records.
 */

router.get('/getdata', function (req, res) {
    console.log("Get data API calling !!");
    client.execute("SELECT * FROM projectexecutionoutput LIMIT 10", function (err, result) {
        if (!err) {
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                console.log("No results");
                res.status(404).send('No results!');
            }
        }
    });
});


module.exports = router;