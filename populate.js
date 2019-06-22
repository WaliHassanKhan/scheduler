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
    time: new Date('2019-06-30T15:12:00.000+00:00'),
    description: 'dentist appointment'
  },
  {
    time: new Date('2019-06-29T22:44:00.000+00:00'),
    description:'meeting'
  },
  {
    time: new Date('2019-06-29T15:00:00.000+00:00'),
    description: 'graduation ceremony'
  }
]
