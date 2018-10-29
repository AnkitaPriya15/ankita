
//step1:
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app= express();


app.set('view engine', 'jade');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost/pop1');
var person1Schema = mongoose.Schema({
   name: String,
   description: String
});
var Person1 = mongoose.model("Person1", person1Schema);


app.get('/pop',function(req,res){

	res.render('person1');

});
app.get('/display',function(req,res){
Person1.find(function(err,response){
	res.render('display',{user:response});
	//console.log(response);

});
});

app.get('/update/:id',function(req,res){
    q=req.params.id;
  Person1.findOne({"_id": q}, function (err, product) {
      res.render('k5',{user:product});
    });
});

app.post('/display_page',function(req,res){
  //console.log(req.body);
    var query={"_id": req.body.id}
    //console.log(req.body)
    var newq={  "name":req.body.name,"description":req.body.description }
  Person1.updateOne(query, newq,function(err, response){
      //console.log(response)
     // res.render('k5',{user:response});
      
      res.redirect('/display')
  });  
})
app.get('/delete/:id',function(req,res){
    q=req.params.id;
    Person1.findOne({"_id" : q}, function(err, response){
    res.render('delete',{user:response});
      });
 });
 app.post('/del',function (req, res) {
      Person1.remove({'_id':req.body.id}, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.redirect('/display')
    });
  })


app.post('/person1', function(req, res){
   var person1Info = req.body; //Get the parsed information
	//console.log(req.body);	   
   if(!person1Info.name || !person1Info.description){
      res.render('k22', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson1 = new Person1({
         name: person1Info.name,
         description: person1Info.description
      });
		
      newPerson1.save(function(err, Person1){
         if(err)
            res.render('k22', {message: "Database error", type: "error"});
         else
            res.redirect('/display')
            //res.render('k22', {
              // message: "New person added", type: "success", person1: person1Info});
      });
   }
}).listen(8000);