//THIS FILE: CREATE/CONNECT to a database
//ESTABLISH the connection between Express Server --- MongoDB


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flights', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
	
// shortcut to mongoose.connection object
const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`); // event listener for the connection to MongoDB
});

db.on("error", function (err){
  console.log(`There was an ${err}`);
});