import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import HomePage from './HomePage'; 
import TicketForm from './TicketForm';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/submit-ticket">Submit Ticket</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/submit-ticket" element={<TicketForm />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>IT Support ©2023 Created with Ant Design</Footer>
      </Layout>
    </Router>
  );
};

export default App;
