const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

// view a form for a new ticket
const newTicket= (req, res) => {
	res.render('tickets/new', {flightDoc: req.params.id });
}

const create = (req, res) => {
	
	req.body.flight = req.params.id;
	console.log(req.body, "<----- content from ticket form")
	Flight.findById(req.params.id, function(err, flightDoc){
		Ticket.create(req.body, function(err, ticketDoc) {
			if (err) {
			console.log(err, " ERR in the Create Ticket");
			}
			res.redirect(`/flights/${req.params.id}`, flightDoc, ticketDoc);
		});

	})
	
}

let deleteTicket = (req, res) =>{
	Ticket.findById(req.params.id).populate('flight').exec(function(err, ticketDoc) {
		Ticket.findByIdAndDelete(req.params.id, function(err) {
			console.log(`deleting: ${ticketDoc}`);
			res.redirect(`/flights/${ticketDoc.flight._id}`);
		});
	});
}

module.exports = {
	create,
	new: newTicket,
	delete: deleteTicket
};