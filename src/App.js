import React from 'react';
import TicketForm from './TicketForm';

const App = () => {
  const handleFormSubmit = (values) => {
    console.log('Received values of form: ', values);
    // Here, you would typically send the values to the backend.
  };

  return (
    <div style={{ margin: '20px' }}>
      <TicketForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
