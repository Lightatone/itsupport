import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './TicketForm.css';
import axios from 'axios'; 

const TicketForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // 假设你的API Endpoint是 https://your-api-endpoint/submitTicket
    const apiUrl = 'https://your-api-endpoint/submitTicket';
    try {
      // 将文件列表转换成适合发送的格式
      // 注意：这里假设服务器可以处理文件上传。如果不处理文件上传，可能需要其他方法处理文件
      if(values.attachment) {
        values.attachment = values.attachment.map(file => file.originFileObj);
      }

      // 发送POST请求到你的API
      const response = await axios.post(apiUrl, values);
      console.log('Submit success:', response.data);
      message.success('Ticket submitted successfully!');
    } catch (error) {
      console.error('Submit failed:', error);
      message.error('Ticket submission failed.');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        label="RemotePC ID and Phone Extension"
        name="remotePCID"
        rules={[{ required: true, message: 'Please input your RemotePC ID and Phone Extension!' }]}
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
        label="Attachment (Optional)"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
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
