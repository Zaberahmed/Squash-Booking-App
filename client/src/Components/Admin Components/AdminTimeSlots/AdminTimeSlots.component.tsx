import { ChangeEvent, useState } from 'react';
import './AdminTimeSlots.component.css';
import timeslots from '../../../utils/timeslots';
import AdminService from '../../../Services/Admin.service';
import Timeslot from '../../../Interfaces/Timeslot.interface';
import { useLocation } from 'react-router-dom';

const AdminTimeSlots = () => {
	const location = useLocation();
	const selectedDates = location.state.selectedDates;
	const selectedDays = location.state.selectedDays;
	const eventType = location.state.eventType;

	const [inputValue, setInputValue] = useState<string>('');
	const [updatedInputValue, setUpdatedInputValue] = useState<string>('');
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
	const [selectedTimeSlots, setSelectedTimeSlots] = useState<Timeslot[]>([]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInputValue(e.target.value);
	};
	const handleAddBtn = () => {
		setUpdatedInputValue(inputValue);
		setInputValue('');
	};

	const handleTimeClick = (time: string, slotName: string) => {
		if (selectedTimes.includes(time)) {
			// If the time is already selected, remove it from the array
			setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== time));
			setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot.time !== time));
		} else {
			// If the time is not selected, add it to the array
			setSelectedTimes([...selectedTimes, time]);
			setSelectedTimeSlots([...selectedTimeSlots, { slotName, time }]);
		}
	};
	const handleCreateButton = async () => {
		try {
			// console.log(selectedTimeSlots);
			const title = updatedInputValue;
			console.log(title);
			const type = eventType;
			const dates = selectedDates;
			const slots = selectedTimeSlots;
			const days = selectedDays;

			const result = await AdminService.createEvent({ title, type, dates, days, slots });
			console.log(result);

			setInputValue('');
			setSelectedTimeSlots([]);
		} catch (error) {
			console.log(error);
		}
	};

	const timeSlotsForAdmin = timeslots;
	return (
		<div className="">
			<form className="flex flex-row space-x-3">
				<input
					type="text"
					placeholder="Add the name of your event"
					name="name"
					value={inputValue}
					onChange={handleInputChange}
					className="rounded"
				/>
				<button
					className=" bg-green-600 rounded-lg p-3 mb-5"
					onClick={handleAddBtn}>
					Add
				</button>
			</form>
			<button
				className="bg-teal-800 text-slate-800 w-20 rounded"
				onClick={() => setSelectedTimeSlots(timeSlotsForAdmin)}>
				All
			</button>
			<div className="grid grid-cols-3 ">
				{timeSlotsForAdmin.map((time) => (
					<button
						key={time.slotName}
						className={`p-4 bg-yellow-100 border-2 border-yellow-400 rounded-md m-2 ${selectedTimes.includes(time.time) ? 'disabled bg-white text-gray-400' : ''}`}
						onClick={() => handleTimeClick(time.time, time.slotName)}
						disabled={selectedTimes.includes(time.time)}>
						{time.time}
					</button>
				))}
			</div>

			<button
				onClick={handleCreateButton}
				className=" bg-blue-500 rounded-lg text-end p-3">
				Create Event
			</button>
		</div>
	);
};

export default AdminTimeSlots;
