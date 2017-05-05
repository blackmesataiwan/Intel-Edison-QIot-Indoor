var express = require('express');
var multer = require('multer');
var app = express();
var port = 5000;
var fs = require('fs');

app.set('port', port); 

/* Disk Storage engine of multer gives you full control on storing files to disk. The options are destination (for determining which folder the file should be saved) and filename (name of the file inside the folder) */

var storageRes = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '/home/root/Edison_Inbox/res');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var storageSsl = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '/home/root/Edison_Inbox/ssl');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});
/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

var uploadRes = multer({storage: storageRes}).single('jsonfile');
var uploadSsl = multer({storage: storageRes}).single('sslfile');

//Showing index.html file on our homepage
app.get('/', function(resuest, response) {
  response.sendFile('/home/root/Edison_Inbox/web/index.html');
});

//Posting the file upload
app.post('/uploadRes', function(request, response) {
  uploadRes(request, response, function(err) {
  if(err) {
    console.log('Error Occured');
    response.end('Error Occured');
    return;
  }
  var data = fs.readFileSync(request.file.path, 'utf8');
  data = JSON.parse(data);
  console.log(request.body);
  console.log(data);
  response.end('<h2>Resource file Uploaded</h2>');
  console.log('Resource file Uploaded');
  })
});

app.post('/uploadSsl', function(request, response) {
  uploadSsl(request, response, function(err) {
  if(err) {
    console.log('Error Occured');
    response.end('Error Occured');
    return;
  }
  var data = fs.readFileSync(request.file.path, 'utf8');
  data = JSON.parse(data);
  console.log(request.body);
  console.log(data);
  response.end('<h2>SSL file Uploaded</h2>');
  console.log('SSL file Uploaded');
  })
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});