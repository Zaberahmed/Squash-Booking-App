import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalender.component.css';
import AdminTimeSlots from '../AdminTimeSlots/AdminTimeSlots.component';
import { eachDayOfInterval } from 'date-fns';
const AdminCalendar = () => {
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);

	const handleDateChange = async (date: Date) => {
		console.log(date);

		setSelectedDates((previousState) => [...previousState, date]);
		console.log(selectedDates);

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
					/>
					<br />
					{selectedDates.length > 0 ? (
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
				<AdminTimeSlots />
			</div>
		</div>
	);
};

export default AdminCalendar;
