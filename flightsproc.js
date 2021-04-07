const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const tableName = "octank-flights-info";

//var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.processSeats = (req, res) => {

const params = {
    FilterExpression: "#date between :start_date and :end_date",
    ExpressionAttributeNames:{
        "#date": "date",
    },
    ExpressionAttributeValues: {
        ":start_date" : "2019-06-31",
        ":end_date" : "22-12-31",
    },
    TableName: tableName,
};

console.time("t");
var t0 = Date.now()

docClient.scan(params, function(err,data){
    if (err) {
        console.log("Error", err);
    } else{
        let flightsProcessed = [];
    
        data.Items.forEach(function(flight){
            console.log(flight.id+" # seats: "+flight.seats);
            var seats_mod = flight.seats;
            var rnd = 0;
            if (seats_mod >= 50){
                rnd = Math.floor(Math.random()*((seats_mod-1)+1)+1); //número aleatorio entre 1 y la cantidad de asientos en el registro
                seats_mod = seats_mod - rnd;
            } else {
                rnd = Math.floor(Math.random()*((323-seats_mod)+1));
                seats_mod = seats_mod + rnd;
            }
            console.log(flight.id+" # seats: "+seats_mod, rnd);
            var flg = { id: flight.id, seats: seats_mod, difference: rnd, date: flight.date}
            flightsProcessed.push(flg);
        });
        
        res.send(flightsProcessed);
        //console.log("Success",JSON.stringify(data));
    }
});

console.timeEnd("t");
} 