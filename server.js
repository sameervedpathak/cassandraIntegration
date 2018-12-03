var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();  

var projectexecutioninputroutes = require('./routes/projectexecutioninput');
var projectexecutionoutputroutes = require('./routes/projectexecutionoutput');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;       

// all of our routes will be prefixed with /api
app.use('/api', projectexecutioninputroutes);
app.use('/api/projectexecutionoutput',projectexecutionoutputroutes);

app.listen(port);

console.log('Magic happens on port ' + port);