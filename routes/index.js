const flights = require('../backendapp');
//import reserve from '../reserveFlight';

module.exports = function (app) {
    app.route('/getflights')
        .get(flights.fetchFlights);
}