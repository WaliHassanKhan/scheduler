var mongoose = require('mongoose');
var MongooseDB = require('./models/DB_Model');
const uri = 'mongodb+srv://apex:Apex.123@nbad-679cs.gcp.mongodb.net/apex?retryWrites=true&w=majority';
const ret = mongoose.connect(uri, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',console.error.bind(console,'error in connection'));
db.once('open',function(){
  MongooseDB.Appointment.remove({},function(err){
    MongooseDB.Appointment.collection.insert(data,function(err){
      if(err){
        console.log(err);
      }else{
        console.log('insertion successful');
      }
    });
  });
});

var data = [
  {
    time: Date.now(),
    description: 'dentist appointment'
  },
  {
    time: Date.now()+10100000,
    description:'meeting'
  },
  {
    time: Date.now()+201000000,
    description: 'graduation ceremony'
  }
]
