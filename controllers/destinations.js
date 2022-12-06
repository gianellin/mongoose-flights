
const Flight = require("../models/flight")



// creating a destination
function create(req, res){
    // checking content
    console.log("========================");
    console.log(req.body, 'Contents of the form');
    console.log("========================");
    console.log(req.params.id, '<req.params.id')
    console.log("========================");

    Flight.findById(req.params.id, function (err, flightDoc) {
        if (err) {
          console.log(err, " <- err from Flight.findById callback");
          return res.send("error from create destination check the terminal");
        }
    
        console.log("========================");
        // found flight from the database that we want to add the destination (req.body) to!
        console.log(flightDoc, " <- flight from the database!");
        console.log("========================");
    
        // 2. add the destination to the flightDocuments destinations array
        // req.body (contents of the form), which in this case represents a destination!
        flightDoc.destinations.push(req.body);
        // since flightDoc is a document and we're mutating it (changing it, adding something to destinations array)
        // we need to tell the database, so to tell database we call `.save() on the flightDoc
        flightDoc.save(function (err) {
          // respond to the client
        //   console.log(flightDoc)
          console.log(err, " <_ err from flightDoc.save callback")
          // respond to the client in the callback
          // go back to the show page that the form was submitted from
          // so you can check the flight from the database in the show controller
          res.redirect(`/flights/${req.params.id}`);
        });
      });
    }
    
    module.exports = {
        create
    }
