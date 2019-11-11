//Acomodar para que pueda llamarse esta funcion por REST API

let AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});

let dynamo = new AWS.DynamoDB.DocumentClient();


exports.reserveSeat = (req, res) => {
    let table = 'octank-flights-info';

    //Si se pasan parámetros
    //let id=req.query.id;
    //let date= req.query.date

    let id = 145;
    let date = "2019-11-25";

    let params = {
        TableName: table,
        Key: {
            "id": id,
            "date": date
        }
    };

    let flightData = {};

    dynamo.get(params, function (err, data) {
        if (err) {
            res.json(JSON.stringify(err, null, 2));
        } else {
            flightData = data;

            params = {
                TableName: table,
                Key: {
                    "id": flightData.Item.id,
                    "date": flightData.Item.date
                },
                UpdateExpression: "set seats = :s",
                ExpressionAttributeValues: {
                    ":s": flightData.Item.seats + 1
                },
                ReturnValues: "UPDATED_NEW"
            };

            dynamo.update(params, function (err, dataUp) {
                if (err) {
                    res.json(SON.stringify(err, null, 2));
                } else {
                    res.send('There are '+dataUp.Attributes.seats+' available seats left in flight '+flightData.Item.id);
                }
            });
        }
    });

}