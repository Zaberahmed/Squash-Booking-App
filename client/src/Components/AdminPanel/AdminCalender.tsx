import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalender.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import AdminTimeSlots from './AdminTimeSlots/AdminTimeSlots';
import { eachDayOfInterval } from 'date-fns';

const AdminCalendar: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Value>([]);
  
 

  const handleDateChange = (value: Value) => {
    console.log(value);
    if (value.length === 1) {
      setSelectedDates([value[0], value[0]]);
    } else {
      setSelectedDates(value);
    }
   
    
  };
  if (selectedDates.length === 2) {
    const [startDate, endDate] = selectedDates;
    const datesBetween = eachDayOfInterval({ start: startDate, end: endDate });
    
    const formattedDates = datesBetween.map((date) => new Date(date).toISOString());
    console.log(formattedDates);
  }

  return (
    <div className=''>
      <div className='flex gap-4'>
        <div  className=''>
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
            <span className='bold'>Start:</span>
            {selectedDates[0].toDateString()}
           
            <span className='bold'>End:</span>
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
