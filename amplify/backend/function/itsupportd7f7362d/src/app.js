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
const s3 = new AWS.S3();

// 设置区域
AWS.config.update({region: 'us-east-2'}); // 根据你的SES配置调整区域
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// 创建SES服务对象
const ses = new AWS.SES();

// 修改或添加发送电子邮件的逻辑
app.post('/sumbit', function(req, res) {
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
      // 电子邮件发送成功，现在尝试存储电子邮件信息
      console.log("working for save info");
      storeEmailInformation({to, from, subject, body})
        .then(storeRes => {
          // 如果存储成功，返回电子邮件发送和存储都成功的响应
          console.log('Failed to store email information:');
          res.json({success: 'Email sent and stored successfully', storeRes});
        })
        .catch(storeErr => {
          // 如果存储失败，只报告存储失败的错误
          console.log('Failed to store email information:', storeErr);
          // 这里选择返回的响应取决于你希望客户端如何处理这种情况
          // 如果你希望客户端知道电子邮件发送成功，但存储失败，可以如下返回
          res.json({warning: 'Email was sent, but information could not be stored', storeErr});
        });

    }
  });
  function storeEmailInformation(emailInfo) {
    return new Promise((resolve, reject) => {
      const dbParams = {
        TableName: "Email",
        Item: {
          // 假设有一个主键叫emailId，这里我们简单用时间戳
          emailId: `${Date.now()}`,
          to: emailInfo.to,
          from: emailInfo.from,
          subject: emailInfo.subject,
          body: emailInfo.body,   
        }
      };
  
      dynamoDB.put(dbParams, function(err, data) {
        if (err) {
          console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          reject(err);
        } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          resolve(data);
        }
      });
    });
  }
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
