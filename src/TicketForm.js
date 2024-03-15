import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './TicketForm.css';
import axios from 'axios'; 

const TicketForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    console.log("here is the values ", values)
    // 假设你的API Endpoint是 https://your-api-endpoint/submitTicket
    const apiUrl = 'https://798eodj4el.execute-api.us-east-2.amazonaws.com/staging/submitTicket';
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
    // 假设这是处理文件上传的后端API Endpoint
    // const fileUploadUrl = 'https://your-api-endpoint/uploadFile';

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
