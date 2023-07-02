import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalender.component.css';
import { eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
// import { Value } from 'react-calendar/dist/cjs/shared/types';

const AdminCalendar = () => {
	const navigate = useNavigate();
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);

	const handleDateChange = (date: Date) => {
		setSelectedDates((previousState) => [...previousState, date]);

		if (selectedDates.length >= 2) {
			const [startDate, endDate] = selectedDates;
			const datesBetween = eachDayOfInterval({ start: startDate, end: endDate });
			const formattedDates = datesBetween.map((date) => new Date(date).toISOString());
			console.log(formattedDates);
			setSelectedDates([]);
		}
	};

	return (
		<div>
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Book your calender</h1>
			<div className="flex gap-4">
				<div className="">
					<Calendar
						onClickDay={handleDateChange}
						value={[selectedDates[0], selectedDates[1]]}
						selectRange={true}
						showNeighboringMonth={false} // Hide neighboring months in the calendar
						goToRangeStartOnSelect
						minDate={new Date()}
					/>

					{selectedDates.length > 1 ? (
						<p className="text-center date-range">
							<span className="bold">Start:</span>
							{selectedDates[0].toDateString()}

							<span className="bold">End:</span>
							{selectedDates[selectedDates.length - 1].toDateString()}
						</p>
					) : (
						<p className="text-center">
							<span className="bold">Please select a date range.</span>
						</p>
					)}
				</div>
			</div>
			<button
				className=" bg-blue-500 rounded-lg text-end p-3"
				onClick={() => {
					navigate('/admin/timeslots', { state: { selectedDates: selectedDates } });
				}}>
				Next
			</button>
		</div>
	);
};

export default AdminCalendar;
