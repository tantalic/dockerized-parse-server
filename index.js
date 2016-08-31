var express = require('express'),
    ParseServer = require('parse-server').ParseServer,
    path = require('path'),
    crypto = require('crypto');

// DATABASE_URI
var databaseUri = process.env.DATABASE_URI;
if (!databaseUri) {
  databaseUri = 'mongodb://localhost:27017/dev';
  console.log('DATABASE_URI not specified, falling back to: ' + databaseUri);
}

// APP_ID
var appId = process.env.APP_ID;
if (!appId) {
  appId = crypto.randomBytes(32).toString('hex');
  console.log('APP_ID not specified, using: ' + appId);
}

// MASTER_KEY
var masterKey = process.env.MASTER_KEY;
if (!masterKey) {
  masterKey = crypto.randomBytes(32).toString('hex');
  console.log('MASTER_KEY not specified, using: ' + masterKey);
}

// CLOUD_CODE_MAIN
var cloud = process.env.CLOUD_CODE_MAIN;

// PARSE_MOUNT
var mountPath = process.env.PARSE_MOUNT;
if (!mountPath) {
  mountPath = '/parse';
  console.log('PARSE_MOUNT not specified, using: ' + mountPath);
}

// PORT
var port = process.env.PORT || 1337; 

// SERVER_URL
var serverURL = process.env.SERVER_URL;
if (!serverURL) {
  serverURL = 'http://localhost:' + port + mountPath;
  console.log('SERVER_URL not specified, using: ' + serverURL);
}

var app = express();

var api = new ParseServer({
  databaseURI: databaseUri,
  cloud: cloud,
  appId: appId,
  masterKey: masterKey,
  serverURL: serverURL,
  liveQuery: {}
});

app.use(mountPath, api);

// 200
app.get('/', function(req, res) {
  res.status(200).send("It's alive!");
});

var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server running on port ' + port + '.');
});
