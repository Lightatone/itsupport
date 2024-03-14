import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to IT Support</h1>
      <p>
        Submit a ticket: Describe your issue by filling up the support ticket form.
      </p>
      <Link to="/submit-ticket">Submit a Ticket</Link>
    </div>
  );
};

export default HomePage;
