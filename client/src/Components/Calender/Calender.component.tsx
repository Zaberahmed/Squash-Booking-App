import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';


const SimpleCalender: React.FC = () => {
  const timeSlots = [
    { time: '6:00 PM - 7:00 PM', slotId: 'a' },
    { time: '7:00 PM - 8:00 PM', slotId: 'b' },
    { time: '8:00 PM - 9:00 PM', slotId: 'c' },
    { time: '9:00 PM - 10:00 PM', slotId: 'd' },
  ];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='flex justify-between'>
          <div>
            <DateCalendar 
			value={selectedDate} 
			onChange={handleDateSelect} />
          </div>
          <div>
            {selectedDate && (
              <div>
                {timeSlots.map((time) => (
                  <TimeSlots
                    key={time.slotId}
                    selectedDate={selectedDate}
                    time={time.time}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default SimpleCalender;
