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

// app.post('/sumbit', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });
/******************************************************EMAIL */
// 引入AWS SDK
const AWS = require('aws-sdk');

// 设置区域
AWS.config.update({region: 'us-east-2'}); // 根据你的SES配置调整区域

// 创建SES服务对象
const ses = new AWS.SES();

// 修改或添加发送电子邮件的逻辑
app.post('/submit', function(req, res) {
  // 示例：获取请求体中的email信息
  const { to, from, subject, body } = req.body;

  // 定义邮件参数
  var params = {
    Destination: { /* required */
      ToAddresses: [
        to
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Text: {
         Charset: "UTF-8",
         Data: body
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: subject
       }
      },
    Source: from, /* required */
  };

  // 调用SES发送邮件
  ses.sendEmail(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // 错误日志
      res.json({error: 'Email could not be sent', details: err});
    } else {
      console.log(data); // 成功的响应
      res.json({success: 'Email sent successfully', data});
    }
  });
});

/******************************************************EMAIL */
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
