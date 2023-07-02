import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import filterAvailableSlots from '../../../utils/filterAvailableSlots';
import UserService from '../../../Services/User.service';
import Timeslot from '../../../Interfaces/Timeslot.interface';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

const SimpleCalender = () => {
	const navigate = useNavigate();

	const [timeSlots, setTimeSlots] = useState<Timeslot[]>([]);
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(new Date()));

	const handleDateSelect = async (date: Dayjs | null) => {
		setSelectedDate(date);

		const result = await UserService.availableSlots({
			date: date?.toISOString(),
		});
		//helper function call from utils to filter for reserved events
		const filteredresult = await filterAvailableSlots(result);
		// console.log(filteredresult);
		setTimeSlots((previousState) => {
			previousState = filteredresult;
			return previousState;
		});
		// console.log(timeSlots);
		// console.log(selectedDate?.toISOString());
	};

	useEffect(() => {
		if (timeSlots && timeSlots.length)
			navigate('/timeslotlist', {
				state: { timeSlots: timeSlots, selectedDate: selectedDate?.toISOString() },
			});
	}, [timeSlots]);

	return (
		<div className="">
			<h1
				className="primary pt-10  px-3 pb-3 mb-3 rounded-t-full text-white text-center
			font-semibold text-xl">
				Squash Court Slots
			</h1>
			<h2 className="text-green font-large font-semibold mt-7 mx-5">Select a Day</h2>
			<div>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<div>
						<div>
							<DateCalendar
								value={selectedDate}
								onChange={handleDateSelect}
								views={['day']}
								disablePast
								// maxDate={dayjs().add(7, 'day').toDate()}
								sx={{
									'& .MuiTypography-root.MuiDayCalendar-weekDayLabel': {
										fontSize: '16px',
										fontWeight: 'bold',
										color: '#00B894',
									},
									'& .MuiTypography-root.MuiDayCalendar-day:not(.Mui-disabled)': {
										fontSize: '44px',
										color: '#00B894',
									},
									'& .MuiIconButton-root.MuiIconButton-edgeStart:not(.Mui-disabled)': {
										color: '#00B894',
									},
									'& .MuiIconButton-root.MuiIconButton-edgeEnd:not(.Mui-disabled)': {
										color: '#00B894',
									},

									'& .css-dplwbx-MuiPickersCalendarHeader-label': {
										color: 'black',
										fontWeight: 800,
										fontSize: '20px',
									},
									'& .custom-button.Mui-selected': {
										backgroundColor: 'green',
									},

									'& .css-12p2adl-MuiDayCalendar-monthContainer .Mui-selected': {
										/* Add styles for the selected date */
										backgroundColor: '#00B894',
										color: 'white',
									},
									'& .css-15v8kdh-MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer': {
										border: '3px solid #00B894',
										borderRadius: '6px',
									},
								}}
							/>
						</div>
						<div>{selectedDate && (!timeSlots || timeSlots.length <= 0) ? <p className="text-black">No available slots for the day</p> : <></>}</div>
					</div>
				</LocalizationProvider>
			</div>
		</div>
	);
};

export default SimpleCalender;
