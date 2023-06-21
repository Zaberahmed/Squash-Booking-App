import React from 'react';
import './Upcoming.css'
const Upcoming = () => {
  return (
    <div>
      <div className="upcoming-card">
        <div className="card-content">
          <h2>Upcoming</h2>
          <p><strong>Date:</strong> June 18, 2023</p>
          <p><strong>Court Number:</strong> 123</p>
          <p><strong>Partner Player:</strong> John Doe</p>
        </div>
      </div>
      <br /><br />
      <div className="upcoming-card">
        <div className="card-content">
          <h2>Upcoming</h2>
          <p><strong>Date:</strong> June 18, 2023</p>
          <p><strong>Court Number:</strong> 123</p>
          <p><strong>Partner Player:</strong> John Doe</p>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
