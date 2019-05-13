var http = require('http');
const express = require('express');
const app = express();
var redis = require("redis");

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/pooling', function (req, res) {
   
   

    res.send('pooling');
});
app.get('/', function (req, res) {
     res.send('tesi9ng');
});
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port !')
})