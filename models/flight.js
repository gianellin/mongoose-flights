const mongoose =require('mongoose');
// shortcut to mongoose schema class
const Schema = mongoose.Schema;

// second schema one to many (optional) will reconrd the time it was created.
const destinationSchema = new Schema ({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],     
    },

    arrival: {
        type: Date,

        }

});

//THE SCHEMA for the flight model -- based on requirements
const flightSchema = new Schema({
    airline: {
                type: String,
                enum: ['American', 'Delta', 'Southwest', 'United'],
                default: 'American'
    },
    airport: {
                type: String,
                enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
                default: 'DEN'         
    },
    flightNo: {
                type: Number,
                min: 10,
                max: 9999
    },
    departs: {
                type: Date,
                default: function() {
                    let date= new Date();
                    let a = date.setFullYear(date.getFullYear() + 1);
                    // let year = date.getFullYear();
                    // let month = date.getMonth();
                    // let day = date.getDate();
                    // let a = (year+1, month, day);
                    return a;
                    }
    },

    destinations: [destinationSchema] 
});


module.exports = mongoose.model('Flight', flightSchema);




