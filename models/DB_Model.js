var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  time:{
    type: Date
  },
  description:{
    type: String
  }
});
appointmentSchema.index({description: "text"});
var Appointment = mongoose.model('eAppointment',appointmentSchema);

module.exports.Appointment = Appointment;
module.exports.appointmentSchema = appointmentSchema;
