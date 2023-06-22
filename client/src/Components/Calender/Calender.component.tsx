import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';
import timeslots from '../../utils/timeslots';

const SimpleCalender: React.FC = () => {
	const timeSlots = timeslots;
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [calendarStyle, setCalendarStyle] = useState({
		marginTop: '',
		transition: '',
		transform: '',
	});
	const [headingStyle, setHeadingStyle] = useState({
		fontSize: '',
		marginTop: '',
		transition: '',
	});

	const handleDateSelect = async (date: Date | null) => {
		setSelectedDate(date);
		// console.log('Date:', selectedDate?.toISOString());
		setCalendarStyle({ marginTop: '-2rem', transition: 'margin-top 2s ease', transform: 'scale(0.8)' });
		setHeadingStyle({ fontSize: '1rem', marginTop: '1rem', transition: 'font-size 2s ease' });
	};

	return (
		<div className="">
			<h1
				className="text-center mt-10 mb-10 font-bold text-2xl"
				style={headingStyle}>
				Book Your Court Now{' '}
			</h1>
			<div className="flex justify-center items-center ">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<div>
						<div
							className="accent rounded drop-shadow-2xl "
							style={calendarStyle}>
							<DateCalendar
								value={selectedDate}
								onChange={handleDateSelect}
							/>
						</div>
						<div>
							{selectedDate && (
								<div className="overflow-y-auto h-64">
									{timeSlots.map((time) => (
										<TimeSlots
											key={time.slotName}
											selectedDate={selectedDate}
											time={time.time}
											slotName={time.slotName}
										/>
									))}
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
