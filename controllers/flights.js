

//import Model in order to perform CRUD operations in the DB
const Flight = require('../models/flight');

let newFlight = (req, res) => {
    const newFlight =new Flight();

    res.render('flights/new');
}

let create = (req, res) => {
    
    console.log(req.body, 'Contents of the form');

    //The server tells de MODEL to take the form and send from the  client
    // and out it in the database
    Flight.create(req.body, function(err, flightDoc){
        if(err) {
        console.log(err);
        res.send('err creating check the terminal')
        }
        console.log(flightDoc);

        res.redirect('/index');
    });


}

function index(req, res) {
    Flight.find({}, function(err, flightDocs){
        console.log(flightDocs)
        
        //this path is not the broser is from the View folder (nested) - to use that index.ejs.
        res.render('flights/index', {flights: flightDocs})
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flightDoc){

        //responding to the client, passing in the flightDoc as a variable called flight into the showpage
        res.render('flights/show', { title: ' Flight Detail ', flightDoc});
    })
}

module.exports = {
    create,
    new: newFlight,
    index,
    show
}