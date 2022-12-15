const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

const newFlight = (req, res) => {
    res.render('flights/new');
}
//New flight
const create = (req, res) => {
    console.log(req.body, 'Contents of the flight form');
    Flight.create(req.body, function(err, flightDoc){
        if(err) {
        console.log(err);
        res.send('err creating check the terminal')
        }else {
            console.log(flightDoc, "----> this is the flightDoc");
            res.redirect(`/flights`);
        }
    });
}

//index Flights
function index(req, res) {
    Flight.find({}, function(err, flightDocs){
        console.log(flightDocs)
        if(err) {
            console.log(err);
            res.send('err in index')
            }else {
            //this path is not the broser is from the View folder (nested) - to use that index.ejs.
            res.render('flights/index', {flights: flightDocs})
        }
    })
}
//show page flights, destinations and tickets
const show = (req, res) => {
    Flight.findById(req.params.id, function(err, flightDoc){
        Ticket.find({flight: flightDoc._id}, function (err, ticketsDoc) {
            console.log(ticketsDoc, '<---- ticket information')
            console.log(flightDoc)
            if(err) {
                console.log(err);
                res.send('err in index')
                }else {
                    //RESPONSE RENDER
                    // 1. res.render (ejs route) 
                    // 2. I am showing out the flight
                    // 3. and LAST modification is allowing to render the tickets list in this flight show page. 
                    // the ticketsDoc was added once the resource TICKET got a controller CREATE
                    res.render('flights/show', {flightDoc, ticketsDoc});
                    
                }});
    });
}

module.exports = {
    create,
    new: newFlight,
    index,
    show
}