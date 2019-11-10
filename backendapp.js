const fetch = require("node-fetch");
const pjson = require('./package.json');

exports.fetchFlights = async (req, res) => {
    try {

        let appVersion = pjson.version;
        // PARA PASAR PARAMETROS POR URL
        // let  fromValue = req.query.from; 
        // let  toValue = req.query.to; 
        // let  dateValue = req.query.date;

        let fromValue = 'EZE';
        let toValue = 'MAD';
        let dateValue = '2019-11-25';

        let params = '?from=' + fromValue + '&to=' + toValue + '&date=' + dateValue;
        let url = 'https://7fbvuzi711.execute-api.us-east-1.amazonaws.com/Dev/getflights' + params;

        let date = new Date();

        let utcTime = date.getTime();

        let offset = -3; //Timezone Argentina

        let localTime = utcTime + (3600000 * offset);

        let newDate = new Date(localTime);

        let response = await fetch(url);
        if (response.ok) {
            let resData = await response.json();

            let flights = (resData).length;

            if (flights == 0) {
                res.send('No flights available in the selected date! - Current Time: ' + newDate.toLocaleTimeString() + '. Current App Version: '+appVersion);
            } else if (flights == 1) {
                res.send('There is ' + flights + ' flight available in the selected date! - Current Time: ' + newDate.toLocaleTimeString() + '. Current App Version: '+appVersion);
            } else {
                res.send('There are ' + flights + ' flights available in the selected date! - Current Time: ' + newDate.toLocaleTimeString() + '. Current App Version: '+appVersion);
            }

        } else {
            res.send('ERROR - Current Time: ' + newDate.toLocaleTimeString());
        }
        //throw new Error('No results!');
        //console.log(resData);
        //return resData;
    } catch (err) {
        console.error(err);
    }
};