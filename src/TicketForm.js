import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './TicketForm.css';
import axios from 'axios'; 
import { uploadData,getUrl  } from 'aws-amplify/storage';
import {Storage } from 'aws-amplify';

const TicketForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    let formData = { ...values };
    if (values.attachment && values.attachment.length > 0) {
      const uploadPromises = values.attachment.map(file =>
        file.originFileObj ? handleUpload(file.originFileObj) : Promise.resolve('')
      );
      const filenames = await Promise.all(uploadPromises);
      // console.log("here is the filename", filenames);
      const urlPromises = filenames.map(filename => 
        filename ? getUrl({ key: filename, options: { accessLevel: 'guest'} }) : Promise.resolve({ url: '' })
      );
       // 等待所有获取URL的promise完成
      const urlsResults = await Promise.all(urlPromises);
      // 提取URL，忽略空字符串
      const fileUrls = urlsResults.map(result => result.url).filter(url => url !== '');
      // 添加到formData
      formData.attachment = fileUrls;
    }
    const now = new Date();
    const ticketSupportID = `Ticket Support ID: ${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
    // 假设formData.attachment是一个包含多个URL信息的数组
    let attachmentURLs = formData.attachment.map(a => `${a.origin}${a.pathname}`).join('\n');

    const emailData = {
      to: 'it@itsupportdesks.com', // 收件人地址
      from: 'it@itsupportdesks.com', // 发件人地址，必须是在SES中验证过的.沙盒模式。
      subject: `Ticket Support - ${ticketSupportID}`, // 邮件主题
      body: `Hello, Ticket Support 

      Email: ${values.email}
      Remote PC ID: ${values.remotePCID}
      Phone Extension: ${values.phoneExtension}
      Description: ${values.description}
      Attachment: ${attachmentURLs}
      Best regards,
      Your IT Support`
    };
    try {
      const response = await axios.post('https://vca5r6zcoc.execute-api.us-east-2.amazonaws.com/staging/sumbit', emailData);
      message.success('Ticket submitted successfully');
      // 清除表单
      form.resetFields();
    } catch (error) {
      console.error('Failed to send email:', error);
      // 根据需要添加失败消息
    }
    
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
    try {
      const uploadResult  = await uploadData({
        key: file.name,
        data: file,
        options: {
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
        }
      }).result;
      
      return uploadResult.key;
    } catch (error) {
      console.log('Error uploading file: ', error);
      return '';
    }
  };

  const handleChange = async (info) => {
  
    // 如果上传状态是完成
    if (info.file.status === 'done') {
      // message.success(`${info.file.name} file uploaded successfully`);
      // 可以在这里处理文件上传后的逻辑，比如获取上传后的URL
    } else if (info.file.status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
      console.log(`${info.file.name} file upload failed.`);
    }
  
    // 如果需要，这里也可以处理上传的进度或其他状态
  };
  
  const normFile =  (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList || [];
  
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


