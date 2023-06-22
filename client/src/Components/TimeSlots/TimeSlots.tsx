import React, { useState } from 'react';
import './TimeSlots.css';
import { useNavigate } from 'react-router-dom';

interface ListTimeProps {
	slotName: string;
	time: string;
	selectedDate: Date;
}

const TimeSlots: React.FC<ListTimeProps> = ({ time, selectedDate, slotName }) => {
	const [showButtons, setShowButtons] = useState<boolean>(true);
	const [selectedTime, setselectedTime] = useState<string>('00:00');

	const navigate = useNavigate();
	const handleNextButtonClick = () => {
		navigate('/selectperson', { state: { selectedTime: selectedTime, selectedDate: selectedDate.toISOString(), slotName: slotName } });
		// Handle next button click logic here
		console.log(`Next button clicked for time slot: ${time}`);
	};

	const handleButtonClick = async () => {
		// console.log(`Button clicked for time slot: ${time}`);

		setselectedTime(time);
		console.log(selectedTime);
		// console.log(`Date: ${selectedDate}, Time: ${selectedTime}`);
		// console.log(selectedTime.valueOf());
	};

	const handleMouseEnter = () => {
		setShowButtons(false);
	};

	const handleMouseLeave = () => {
		setShowButtons(true);
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="mx-16">
			{showButtons && <p className="accent rounded-md p-5 m-5 text-center text-black">{time}</p>}
			{!showButtons && (
				<div className="flex justify-center gap-2">
					<button
						onClick={handleButtonClick}
						className=" flex flex-col sm:flex-row border-2
             border-yellow-400 bg-yellow-50 rounded-md
              px-10 py-4 mb-2 ">
						{time}
					</button>
					<button
						className=""
						onClick={handleNextButtonClick}>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default TimeSlots;
