var express = require('express');
var app = express();

app.get('/hello', function(req, res){
   res.send("hello world");
});
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});
app.listen(3000);