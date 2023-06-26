import { ChangeEvent, useState } from 'react';
import './AdminTimeSlots.component.css';
import timeslots from '../../../utils/timeslots';

const AdminTimeSlots = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInputValue(e.target.value);
	};
	const handleAddBtn = () => {
		console.log(inputValue);
	};

	const handleTimeClick = (time: string) => {
		if (selectedTimes.includes(time)) {
			// If the time is already selected, remove it from the array
			setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== time));
		} else {
			// If the time is not selected, add it to the array
			setSelectedTimes([...selectedTimes, time]);
		}
	};

	const selectedAllTimes = () => {
		const allTimes = timeSlotsForAdmin.map((timeSlot) => timeSlot.time);
		setSelectedTimes(allTimes);
	};

	const timeSlotsForAdmin = timeslots;
	return (
		<div className="">
			<button onClick={selectedAllTimes}>All</button>
			<div className="flex flex-row space-x-3">
				<input
					type="text"
					placeholder="events name"
					name="add"
					value={inputValue}
					onChange={handleInputChange}
					className="rounded"
				/>
				<button
					className=" bg-green-600 rounded-lg p-3 mb-5"
					onClick={handleAddBtn}>
					Add
				</button>
			</div>

			<div className="grid grid-cols-3 ">
				{timeSlotsForAdmin.map((time) => (
					<button
						key={time.slotName}
						className={`p-4 bg-yellow-100 border-2 border-yellow-400 rounded-md m-2 ${selectedTimes.includes(time.time) ? 'disabled bg-white text-gray-400' : ''}`}
						onClick={() => handleTimeClick(time.time)}
						disabled={selectedTimes.includes(time.time)}>
						{time.time}
					</button>
				))}
			</div>

			<button className=" bg-blue-500 rounded-lg text-end p-3">next</button>
		</div>
	);
};

export default AdminTimeSlots;
