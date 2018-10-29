var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app= express();


app.set('view engine', 'jade');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost/pop1');
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);


app.get('/pop',function(req,res){

	res.render('person');

});


app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
	console.log(req.body);	   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('k2', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('k2', {message: "Database error", type: "error"});
         else
            res.render('k2', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
}).listen(8000);