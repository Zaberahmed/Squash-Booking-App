import { useState } from 'react';
import './AdminRecurringEvent.component.css';

const AdminRecurringEvent = () => {
	const [selectedDays, setSelectedDays] = useState<number[]>([]);

	const handleDayToggle = (day: number) => {
		const updatedDays = selectedDays.includes(day) ? selectedDays.filter((d) => d !== day) : [...selectedDays, day];
		setSelectedDays(updatedDays);
	};

	return (
		<div className="dayPicker">
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day1"
					checked={selectedDays.includes(1)}
					onChange={() => handleDayToggle(1)}
				/>
				<label htmlFor="day1">Sun</label>
			</div>
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day2"
					checked={selectedDays.includes(2)}
					onChange={() => handleDayToggle(2)}
				/>
				<label htmlFor="day2">Mon</label>
			</div>
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day3"
					checked={selectedDays.includes(3)}
					onChange={() => handleDayToggle(3)}
				/>
				<label htmlFor="day3">Tue</label>
			</div>
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day4"
					checked={selectedDays.includes(4)}
					onChange={() => handleDayToggle(4)}
				/>
				<label htmlFor="day4">Wed</label>
			</div>
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day5"
					checked={selectedDays.includes(5)}
					onChange={() => handleDayToggle(5)}
				/>
				<label htmlFor="day5">Thu</label>
			</div>
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day6"
					checked={selectedDays.includes(6)}
					onChange={() => handleDayToggle(6)}
				/>
				<label htmlFor="day6">Fri</label>
			</div>
			<div className="dayPickerOption">
				<input
					type="checkbox"
					id="day7"
					checked={selectedDays.includes(7)}
					onChange={() => handleDayToggle(7)}
				/>
				<label htmlFor="day7">Sat</label>
			</div>
		</div>
	);
};

export default AdminRecurringEvent;
