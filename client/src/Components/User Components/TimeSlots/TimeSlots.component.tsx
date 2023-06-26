import React, { useState } from 'react';
import './TimeSlots.component.css';
import { useNavigate } from 'react-router-dom';

interface ListTimeProps {
	slotName: string;
	time: string;
	selectedDate: Date;
}

const TimeSlots: React.FC<ListTimeProps> = ({ time, selectedDate, slotName }) => {
	const [selectedTime, setselectedTime] = useState<string>('00:00');
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const navigate = useNavigate();
	const handleButtonClick = () => {
		setIsClicked(!isClicked);
		setselectedTime(time);
		if (isClicked) {
			navigate('/selectperson', { state: { selectedTime: selectedTime, selectedDate: selectedDate.toISOString(), slotName: slotName } });
			console.log(`Next button clicked for time slot: ${time}`);
		}
	};

	return (
		<div className="">
			<div className="flex justify-center gap-2">
				<button
					onClick={handleButtonClick}
					className={`flex flex-col sm:flex-row border-2 border-yellow-400 bg-white rounded-md px-10 py-4 mb-2
         ${isClicked ? 'rotate-animation' : ''}`}>
					{isClicked ? <>Next</> : <>{`${time}`}</>}
				</button>
			</div>
		</div>
	);
};

export default TimeSlots;
