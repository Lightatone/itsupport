import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './TicketForm.css';
import axios from 'axios'; 

const TicketForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
  
    console.log("here are the values", values);
    // 使用axios发送POST请求到你的Lambda函数的API终端
    // try {
    //   const response = await axios.post('https://vca5r6zcoc.execute-api.us-east-2.amazonaws.com/staging/sumbit', values);
    //   console.log('Success:', response.data);
    //   message.success('Ticket submitted successfully!');
    // } catch (error) {
    //   console.error('Failed to submit ticket:', error);
    //   message.error('Failed to submit the ticket. Please try again.');
    // }
     // 构建请求体，确保它包含发送邮件所需的字段
     const emailData = {
      to: 'it@itsupportdesks.com', // 收件人地址
      from: 'it@itsupportdesks.com', // 发件人地址，必须是在SES中验证过的
      subject: 'Test Email from SES', // 邮件主题
      body: 'Hello, this is a test email sent from AWS SES via Lambda.' // 邮件正文
    };

    try {
      const response = await axios.post('https://vca5r6zcoc.execute-api.us-east-2.amazonaws.com/staging/sumbit', emailData);
      console.log('Success:', response.data);
      // 根据需要添加成功消息
    } catch (error) {
      console.error('Failed to send email:', error);
      // 根据需要添加失败消息
    }
    
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
