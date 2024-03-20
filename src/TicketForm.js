import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './TicketForm.css';
import axios from 'axios'; 
import { uploadData  } from 'aws-amplify/storage';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const TicketForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    let formData = { ...values };
    if (values.attachment && values.attachment.length > 0) {
      console.log("result 22");
      const uploadPromises = values.attachment.map(file =>
        file.originFileObj ? handleUpload(file.originFileObj) : Promise.resolve('')
      );
      const fileUrls = await Promise.all(uploadPromises);
      console.log("Here is ", fileUrls);
      // 过滤掉空字符串，只保留成功上传的文件URL
      formData.attachment = fileUrls.filter(url => url !== '');
    }
    console.log("result 22", formData);
    const now = new Date();
    const ticketSupportID = `Ticket Support ID: ${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
    
    const emailData = {
      to: 'it@itsupportdesks.com', // 收件人地址
      from: 'it@itsupportdesks.com', // 发件人地址，必须是在SES中验证过的.沙盒模式。
      subject: `Ticket Support - ${ticketSupportID}`, // 邮件主题
      body: `Hello, Ticket Support 

      Email: ${values.email}
      Remote PC ID: ${values.remotePCID}
      Phone Extension: ${values.phoneExtension}
      Description: ${values.description}
      附件URLs: ${formData.attachment.join(', ')}

      Best regards,
      Your IT Support`
    };
    console.log("Here is the email data", emailData)
    // try {
    //   const response = await axios.post('https://vca5r6zcoc.execute-api.us-east-2.amazonaws.com/staging/sumbit', emailData);
    //   console.log('Success:', response.data);
    //   // 根据需要添加成功消息
    // } catch (error) {
    //   console.error('Failed to send email:', error);
    //   // 根据需要添加失败消息
    // }
    
  };

  /*********************************Attchement check and upload handle*********************************************** */
  
  const beforeUpload = (file) => {
    const isDocOrPdf = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (!isDocOrPdf) {
      message.error('You can only upload DOC or PDF file!');
    }
    const isLessThan5M = file.size / 1024 / 1024 < 10;
    if (!isLessThan5M) {
      message.error('File must be smaller than 10MB!');
    }
    return isLessThan5M && isDocOrPdf || Upload.LIST_IGNORE; // 返回false或Upload.LIST_IGNORE将停止上传，但Upload.LIST_IGNORE不会显示错误信息
  };

  const handleUpload = async (file) => {
    console.log("here handle upload");
    try {
      const result = await uploadData({
        key: file.name,
        data: file,
        options: {
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
        }
      }).result;
      
      console.log('Succeeded: ', result);
      return result.url;
    } catch (error) {
      console.log('Error uploading file: ', error);
      return '';
    }
  };

  const normFile =  (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList || [];
  
    // // 确保fileList是一个数组。如果e.fileList不存在或不是数组，使用空数组作为默认值
    // const fileList = Array.isArray(e?.fileList) ? e.fileList : [];
    // console.log("hello here is norma File");
    // // 使用.map和Promise.all处理文件上传，并等待所有上传操作完成
    // const uploadPromises = fileList.map(file =>
    //   file.originFileObj ? handleUpload(file.originFileObj) : Promise.resolve('')
    // );
    // const fileUrls = await Promise.all(uploadPromises);
  
    // // 过滤掉空字符串，只返回成功上传的文件URL
    // return fileUrls.filter(url => url !== '');
  };
  
  /******************************************************************************** */

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" name="ticketForm">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="RemotePC ID"
        name="remotePCID"
        rules={[{ required: true, message: 'Please input your RemotePC ID!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Extension"
        name="phoneExtension"
        rules={[{ required: true, message: 'Please input your Phone Extension!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description of your problem!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="attachment"
        label="Attachment (Optional) PDF or Word, no more than 10MB"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="logo"
          action="/upload.do"
          listType="picture"
          beforeUpload={beforeUpload} // 使用beforeUpload属性来限制文件类型
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Ticket
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TicketForm;
