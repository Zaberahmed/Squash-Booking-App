import React from 'react';
import './AdminTimeSlots.css';

const AdminTimeSlots = () => {
  return (
    <div className='time-picker-container'>
      <div className='time-picker'>
        <div className='row time-picker-header'>
          <div className='row'>
            <ul className='time-slot'>
              <li className='time-slot-item'>9:00 - 9:30</li>
              <li className='time-slot-item'>10:00 - 10:30</li>
              <li className='time-slot-item'>11:00 - 11:30</li>
              <li className='time-slot-item'>11:30 - 12:00</li>
            </ul>
            <ul className='time-slot'>
              <li className='time-slot-item'>8:00 - 8:30</li>
              <li className='time-slot-item'>10:00 - 10:30</li>
              <li className='time-slot-item'>11:00 - 11:30</li>
            </ul>
            <ul className='time-slot'>
              <li className='time-slot-item'>9:00 - 9:30</li>
              <li className='time-slot-item'>10:00 - 10:30</li>
              <li className='time-slot-item'>11:00 - 11:30</li>
              <li className='time-slot-item'>12:00 - 12:30</li>
              <li className='time-slot-item'>13:00 - 13:30</li>
            </ul>
            <ul className='time-slot'>
              <li className='time-slot-item'>9:00 - 9:30</li>
              <li className='time-slot-item picked'>10:00 - 10:30</li>
              <li className='time-slot-item'>11:00 - 11:30</li>
              <li className='time-slot-item'>12:00 - 12:30</li>
            </ul>
            <ul className='time-slot'>
              <li className='time-slot-item'>9:00 - 9:30</li>
              <li className='time-slot-item'>10:00 - 10:30</li>
              <li className='time-slot-item'>11:00 - 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTimeSlots;
