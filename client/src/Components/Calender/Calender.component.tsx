import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';
import timeslots from '../../utils/timeslots';
import authJWT from '../../Services/authJWT.service';

const SimpleCalender: React.FC = () => {
	const [timeSlots, setTimeSlots] = useState(timeslots);
	const [goClick,setGoClick]=useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [calendarStyle, setCalendarStyle] = useState({
		marginLeft: '',
		transition: '',
		transform: '',
	});
	const [timeSlotsStyle, setTimeSlotsStyle] = useState({
		marginTop: '',
		transition: '',
		
	});
	const [headingStyle, setHeadingStyle] = useState({
		fontSize: '',
		marginTop: '',
		transition: '',
	});

	const handleGoClick = () => {
		setGoClick(true);
		setSelectedDate(null);
		setCalendarStyle({ marginLeft: '', transition: '', transform: '' });
		setHeadingStyle({ fontSize: '', marginTop: '', transition: '' });
		setTimeSlotsStyle({ marginTop: '', transition: '' });
	  };
	  

	const handleDateSelect = async (date: Date | null) => {
		setSelectedDate(date);
		const result = await authJWT.userSlotsAvailability({ date: date?.toISOString() });
		console.log(result);
		setTimeSlots(result);
		setCalendarStyle({ marginLeft: '-200rem', transition: 'margin-left 3s ease', transform: 'scale(0.8)' });
		setHeadingStyle({ fontSize: '1rem', marginTop: '1rem', transition: 'font-size 2s ease' });
		setTimeSlotsStyle({marginTop:'-17rem',transition: 'margin-top 3s ease',})
	};

	return (
		<div className="">
		  <h1
			className="text-center mt-10 mb-10 font-bold text-2xl"
			style={headingStyle}
		  >
			Book Your Court Now
		  </h1>
		  <div className="flex justify-center items-center">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
			  <div>
				<div
				  className=" rounded drop-shadow-2xl"
				  style={calendarStyle}
				>
				  
					<DateCalendar
					  value={selectedDate}
					  onChange={handleDateSelect}
					/>
				
				</div>
				<div>
				  {selectedDate && (
					<div className="grid grid-cols-3 overflow-y-auto h-96" style={timeSlotsStyle}>
					  {timeSlots.length <= 0 ? (
						<>No available slots for the day</>
					  ) : (
						<>
						  {timeSlots.map((time) => (
							<TimeSlots
							  key={time.slotName}
							  selectedDate={selectedDate}
							  time={time.time}
							  slotName={time.slotName}
							/>
						  ))}
						  <br />
						  <br />
						  <button onClick={handleGoClick}>Go back</button>
						</>
					  )}
					</div>
				  )}
				</div>
			  </div>
			</LocalizationProvider>
		  </div>
		</div>
	  );
	  
};

export default SimpleCalender;
