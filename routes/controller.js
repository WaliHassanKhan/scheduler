var express = require('express');
var router = express.Router();
var database = require('../utilities/database')
var bodyParser = require('body-parser'); //used for getting form parameters
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

router.get('/viewAll',function(req,res){
  var callback = function(reply){
    res.send(JSON.parse(JSON.stringify(reply))); // we need to make sure that the reply is in proper format to avoid discripencies
  };
  database.getAppointments(callback);
});

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
