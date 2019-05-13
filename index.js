var redis = require("redis");
var bluebird = require("bluebird");
require('dotenv').config();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Add your cache name and access key.
var client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});
var http = require('http');
const express = require('express');
const app = express();
var redis = require("redis");

const bodyParser = require('body-parser');

async function testCache() {
// Connect to the Azure Cache for Redis over the SSL port using the key.
var cacheConnection = redis.createClient(6380, process.env.REDISCACHEHOSTNAME, 
  {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});
  
// Perform cache operations using the cache connection object...

// Simple PING command
console.log("\nCache command: PING");
console.log("Cache response : " + await cacheConnection.pingAsync());

// Simple get and put of integral data types into the cache
console.log("\nCache command: GET Message");
console.log("Cache response : " + await cacheConnection.getAsync("Message"));    

console.log("\nCache command: SET Message");
console.log("Cache response : " + await cacheConnection.setAsync("Message",
  "Hello! The cache is working from Node.js!"));    

// Demonstrate "SET Message" executed as expected...
console.log("\nCache command: GET Message");
console.log("Cache response : " + await cacheConnection.getAsync("Message"));    

// Get the client list, useful to see if connection list is growing...
console.log("\nCache command: CLIENT LIST");
console.log("Cache response : " + await cacheConnection.clientAsync("LIST"));    
}

testCache();
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