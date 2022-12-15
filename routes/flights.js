var express = require('express');
var router = express.Router();
const flightCtrl = require('../controllers/flights.js');
/* GET users listing. */
router.get('/new', flightCtrl.new);
router.get('/', flightCtrl.index);
router.post('/', flightCtrl.create);
router.get('/:id', flightCtrl.show); //id is a param that woulds capture anything after /flights in a request


module.exports = router;
