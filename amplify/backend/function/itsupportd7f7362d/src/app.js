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
  res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT");
  next()
});
app.options('*', (req, res) => {
  // 设置CORS响应头
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});


/**********************
 * Example get method *
 **********************/

app.get('/sumbit', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/sumbit/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/sumbit', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
  const formData = req.body; // 从请求体中获取表单数据

  sendEmail(formData, function(err, data) {
    if (err) {
      console.error('Error sending email:', err);
      res.status(500).json({error: 'Email could not be sent', details: err.message});
    } else {
      console.log('Email sent successfully:', data);
      res.status(200).json({success: 'Email sent successfully', data: data.MessageId});
    }
  });
});

app.post('/sumbit/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/sumbit', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/sumbit/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/sumbit', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/sumbit/*', function(req, res) {
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

/*sumbit the email*/
const AWS = require('aws-sdk');

// 初始化AWS SES客户端
const ses = new AWS.SES({
    region: 'us-east-1' // 请根据你的SES配置调整区域
});

app.use(awsServerlessExpressMiddleware.eventContext());

// 允许跨域请求
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// 发送电子邮件的函数
function sendEmail(data, callback) {
  const emailParams = {
    Source: 'it@itsupportdesks.com', // 发件人，必须是SES中验证过的
    Destination: {
      ToAddresses:'it@itsupportdesks.com' // 收件人邮箱地址
    },
    Message: {
      Subject: {
        Data: 'Ticket Submission Confirmation' // 邮件主题
      },
      Body: {
        Text: {
          Data: `Your ticket has been submitted successfully. Details:\n\n${data.description}` // 邮件正文
        }
      }
    }
  };

  ses.sendEmail(emailParams, callback);
}

// 修改post方法以发送电子邮件
app.post('/submit', function(req, res) {
  const formData = req.body; // 从请求体中获取表单数据

  sendEmail(formData, function(err, data) {
    if (err) {
      console.log(err, err.stack); // 错误日志
      res.json({error: 'Email could not be sent', details: err});
    } else {
      console.log(data); // 成功的响应
      res.json({success: 'Email sent successfully', data});
    }
  });
});


module.exports = app;
