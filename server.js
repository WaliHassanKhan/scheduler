express = require('express'); //makes http calls and routing much easier
var app = express();
var bodyParser = require('body-parser'); //used for getting request parameters
const path = require('path');

app.use('/assets',express.static(path.join(__dirname,'assets'))); //used for serving static files to user


var PORT = 8080 //hard coded port for testing purpose
app.listen(PORT);

//route section
app.get('/',function(req,res){ //default route
  res.sendFile(__dirname+'/views/index.html');
});
var index = require('./routes/controller');
app.use('/',index); //router will deal with all of the other routes
app.use('*',function(req,res){
  res.redirect('/')
});
///////////////////////////////////////////////////////////////////////////////

console.log('listening on ' + String(PORT));
