const AWS = require('aws-sdk');
const s3 = new AWS.S3();

s3.putObject({
  Bucket: "wolfstream-videos-bucket",
  Key: "hello-s3.txt",
  Body: "Hello S3!",
}).promise