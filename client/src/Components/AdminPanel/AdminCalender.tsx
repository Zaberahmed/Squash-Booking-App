import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalender.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import AdminTimeSlots from './AdminTimeSlots/AdminTimeSlots';

const AdminCalendar: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Value>([]);

  const [goClick, setGoClick] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarStyle, setCalendarStyle] = useState({
    marginLeft: '',
    transition: '',
    transform: '',
  });

  const handleDateChange = (value: Value) => {
    if (value.length === 1) {
      setSelectedDates([value[0], value[0]]);
    } else {
      setSelectedDates(value);
    }
    setCalendarStyle({
      marginLeft: '-200rem',
      transition: 'margin-left 3s ease',
      transform: 'scale(0.8)',
    });
  };

  return (
    <div>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        Book your calender
      </h1>
      <div className='flex gap-4'>
        <div className=''>
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={true}
            isMultiSelection={true}
            showNeighboringMonth={false} // Hide neighboring months in the calendar
          />
          <br />
          {selectedDates.length > 0 ? (
            <p className='text-center date-range'>
              <span className='bold'>Start:</span>{' '}
              {selectedDates[0].toDateString()}
              &nbsp;|&nbsp;
              <span className='bold'>End:</span>{' '}
              {selectedDates[selectedDates.length - 1].toDateString()}
            </p>
          ) : (
            <p className='text-center'>
              <span className='bold'>Please select a date range.</span>
            </p>
          )}
        </div>
        <AdminTimeSlots />
      </div>
    </div>
  );
};

export default AdminCalendar;
