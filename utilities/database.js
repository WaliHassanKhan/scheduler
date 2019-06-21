var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
var MongooseDB = require('../models/DB_Model');
const uri = 'mongodb+srv://apex:Apex.123@nbad-679cs.gcp.mongodb.net/apex?retryWrites=true&w=majority';
const ret = mongoose.connect(uri, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',console.error.bind(console,'error in connection'));
db.once('open',function(){
  var Model = new mongoose.model('eAppointment',MongooseDB.appointmentSchema);
  module.exports.getAppointments = function(callback){
    Model.find().then(function(result){
      callback(result); //sending the data back to the function that called this database function
    });
  };
  module.exports.searchAppointments = function(descriptionInput,callback){
    Model.find({$text:{$search:descriptionInput}}).then(function(result){
      callback(result);
    });
  };
  module.exports.addAppointment = function(newAppointment,callback){
    var date = new Date(newAppointment.date+' '+newAppointment.time+':00.000Z');
    var small = new Model({ time : parseInt(Date.parse(date)) , description : newAppointment.description });
    small.save().then(function(err,result){
      if (err){
        // console.log(err);
      }
      callback();
    });
  };
});
