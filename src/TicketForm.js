import React from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './TicketForm.css';

const TicketForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values); // Pass the form values to a handler function
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
