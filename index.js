  var wit = require('node-wit');
  var fs = require('fs');
  var ACCESS_TOKEN = "FCWG7IW7NJ3ZCOXGQRH3XHSNOKD2KE7I";

/* SOCKET.IO */
var express = require('express');
var app = express();
  //var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
   io.emit('new', 'loltext');
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
/* SOCKET.IO */


  console.log("Sending text & audio to Wit.AI");

 /* wit.captureTextIntent(ACCESS_TOKEN, "The weather is going to be hot tomorrow", function (err, res) {
      console.log("Response from Wit for text input: ");
      if (err) console.log("Error: ", err);
        for (var key in res) {
  if (res.hasOwnProperty(key)) {
    console.log(key + " -> " + res[key]);
   }
  }
              console.log( "BEFORE PARSE: " + typeof res);
      var parse = JSON.stringify(res, null, " ");
      if(typeof parse === 'string'){
        console.log(typeof res);
      } 
      console.log( "AFTER PARSE: " + parse); 
  }); 
*/

  var stream = fs.createReadStream('sample.wav');
  wit.captureSpeechIntent(ACCESS_TOKEN, stream, "audio/wav", function (err, res) {
      console.log("Response from Wit for audio stream: ");
      if (err) console.log("Error: ", err);

      var arr = [];


    for (var key in res) {
      console.log(key + " -> " + res[key]);
      if( typeof res[key] === "object")
      {
        console.log("Success!" + res[key]);
      //  for(var i in res[key]){
          arr = res[key];
          console.log(arr);


          console.log(arr[0].entities);
          var obj = arr[0].entities;
          console.log("OBJECT : " + JSON.stringify(obj.time[0].value) );
          var time = JSON.stringify(obj.time[0].value)
          var date = JSON.stringify(obj.setDate[0].value)
          console.log("OBJECT : " + JSON.stringify(obj.setDate[0].value) );



        //}
        //for(var key1 in key)
        //for (var i = 0; i < res[key].length;  i++) {
        //console.log(key1 + " -> " + key[key1]);
          //console.log(res[key][i]);
          //if( i === 2)
          
           /* for(var entities in res[key][2]) {
              console.log(entities + " -> " + res[key][2][entities]);
            } */
          
        }

      }


      /* SENDING DATA TO FRONT END */

      io.emit('alarm', time, date);

      console.log(JSON.stringify(res, null, " "));
  });
