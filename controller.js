var express = require('express');
var router = express.Router();
var database = require('../utilities/database') //in order to make calls to database we use a seperate module
var bodyParser = require('body-parser'); //used for getting form parameters
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

//view all appointments when the search box is empty
router.get('/viewAll',function(req,res){
  var callback = function(reply){
    res.send(JSON.parse(JSON.stringify(reply))); // we need to make sure that the reply is in proper format to avoid discripencies
  };
  // calling database function below and passing callback to send the result back to client when we get the result back from the database.
  database.getAppointments(callback);
});

//search appointments based on matching keywords from user input
router.get('/search',function(req,res){
  if (req.query.description==''){
    res.redirect('/viewAll');
    return;
  }
  var callback = function(reply){
    res.send(JSON.parse(JSON.stringify(reply))); // we need to make sure that the reply is in proper format to avoid discripencies
  };

  database.searchAppointments(req.query.description,callback);
});

router.post('/add',urlencodedParser,function(req,res){
  var callback = function(reply){
    res.send({success:true});
  }
  database.addAppointment(req.body,callback)
});

module.exports = router;
