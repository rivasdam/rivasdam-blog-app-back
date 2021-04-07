require('dotenv').load();
require('dotenv').config();
var AWS = require('aws-sdk');
var credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey : process.env.S3_SECRET_KEY
};
AWS.config.update({credentials: credentials, region: 'eu-east-1'});
var s3 = new AWS.S3();

var presignedGETURL = s3.getSignedUrl('getObject', {
    Bucket: 'presignedurl-dgr-sa',
    Key: 'Analytics.p', //filename
    Expires: 100 //time to expire in seconds
});
