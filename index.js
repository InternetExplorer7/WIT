  var wit = require('node-wit');
  var fs = require('fs');
  var ACCESS_TOKEN = "FCWG7IW7NJ3ZCOXGQRH3XHSNOKD2KE7I";

/* SOCKET.IO */
  var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
   io.emit('new', 'loltext');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
/* SOCKET.IO */


  console.log("Sending text & audio to Wit.AI");

 /* wit.captureTextIntent(ACCESS_TOKEN, "Hello world", function (err, res) {
      console.log("Response from Wit for text input: ");
      if (err) console.log("Error: ", err);
      console.log(JSON.stringify(res, null, " "));
  }); */

  var stream = fs.createReadStream('sample.wav');
  wit.captureSpeechIntent(ACCESS_TOKEN, stream, "audio/wav", function (err, res) {
      console.log("Response from Wit for audio stream: ");
      if (err) console.log("Error: ", err);
      console.log(JSON.stringify(res, null, " "));
  });