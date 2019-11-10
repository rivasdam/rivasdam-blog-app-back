const flights = require('../backendapp');
const reserve = require('../reserveFlight');
//import reserve from '../reserveFlight';

module.exports = function (app) {
    app.route('/getflights')
        .get(flights.fetchFlights);
    
    app.route('/reserveseat')
        .get(reserve.reserveSeat);
}