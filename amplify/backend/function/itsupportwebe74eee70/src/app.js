/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/submitTicket', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/submitTicket/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

const AWS = require('aws-sdk');
const ses = new AWS.SES({
    region: 'us-east-2', // 替换为AWS区域
});

app.post('/submitTicket', function(req, res) {
    // 解析请求体中的数据
    const { email, remotePCID, phoneExtension, description, attachment } = req.body;
    
    // 构建邮件内容
    const emailParams = {
        Source: 'it@itsupportdesks.com', // 发件人邮箱，必须是SES验证过的
        Destination: {
            ToAddresses: ['it@itsupportdesks.com'], // 接收邮件的邮箱
        },
        Message: {
            Subject: {
                Data: 'IT Support Ticket Submission'
            },
            Body: {
                Text: {
                    Data: `Email: ${email}\nRemotePC ID: ${remotePCID}\nPhone Extension: ${phoneExtension}\nDescription: ${description}`
                    
                }
            }
        }
    };

    // 使用SES发送邮件
    ses.sendEmail(emailParams, function(err, data) {
        if (err) {
            console.error('Error sending email', err);
            res.status(500).json({error: 'Failed to send email'});
        } else {
            console.log('Email sent:', data);
            res.json({success: 'Email sent successfully'});
        }
    });
});


exports.handler = async (event) => {
  try {
    const data = await ses.sendEmail(emailParams).promise();
    console.log('Email sent:', data);
    return { statusCode: 200, body: 'Email sent' };
  } catch (err) {
    console.error('Email sending failed:', err);
    return { statusCode: 500, body: 'Failed to send email' };
  }
};
app.post('/submitTicket/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/submitTicket', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/submitTicket/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/submitTicket', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/submitTicket/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
