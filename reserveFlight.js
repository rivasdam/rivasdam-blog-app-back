//Acomodar para que pueda llamarse esta funcion por REST API

let AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});

let dynamo = new AWS.DynamoDB.DocumentClient();

let table = 'octank-flights-info';

let id = 145;
let date = "2019-11-25";

let params = {
    TableName: table,
    Key:{
        "id": id,
        "date": date
    }
};

let flightData = {};

dynamo.get(params, function(err,data){
    if (err){
        console.error("Unable to read item. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        flightData = data; 
        console.log(flightData);

        params = {
            TableName: table,
            Key: {
                "id": flightData.Item.id,
                "date": flightData.Item.date 
            },
            UpdateExpression: "set seats = :s",
            ExpressionAttributeValues:{
                ":s": flightData.Item.seats-1
            },
            ReturnValues: "UPDATED_NEW"
        };

        console.log("Reserving seat...");
        dynamo.update(params,function(err,dataUp){
            if (err){
                console.error("Unable to update item. Error JSON: ", JSON.stringify(err,null,2));
            }else{
                console.log("UpdateItem suceeded: ", JSON.stringify(dataUp, null, 2));
            }
        });
    }
});


/** 
 * 
 *   {
    "dep_time": "11:00",
    "date": "2019-11-25",
    "from": "EZE",
    "seats": "47",
    "arr_time": "05:10",
    "id": "145",
    "to": "MAD",
    "airline": "AR"
  }
*/