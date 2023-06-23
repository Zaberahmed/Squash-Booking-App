import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import DatePicker, { DateObject } from 'react-multi-date-picker';
// import type { Value } from 'react-multi-date-picker';
import 'react-calendar/dist/Calendar.css';
import './AdminCalender.css';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

const AdminCalendar: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Value>([]);
  const [values, setValues] = useState('10:00');

  const onChange = (timeValue) => {
    setValue(timeValue);
  };

  const handleDateChange = (value: Value) => {
    if (value.length === 1) {
      setSelectedDates([value[0], value[0]]);
    } else {
      setSelectedDates(value);
    }
  };

  return (
    <div className='app'>
      <div>
        <div className='calendar-container'>
          <Calendar
            onChange={handleDateChange}
            value={selectedDates}
            selectRange={true}
            showNeighboringMonth={false} // Hide neighboring months in the calendar
          />
        </div>
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
      <div>
        <DatePicker
          disableDayPicker
          format='HH:mm:ss'
          plugins={[<TimePicker />]}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
