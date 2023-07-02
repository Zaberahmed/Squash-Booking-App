import React, { useState } from 'react';
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

	const handleTimeClick = () => {
		setIsClicked(!isClicked);
		setselectedTime(time);
	};

	const handleNextButtonClick = () => {
		if (isClicked) {
			navigate('/selectperson', { state: { selectedTime: selectedTime, selectedDate: selectedDate, slotName: slotName } });
			console.log(`Next button clicked for time slot: ${time}`);
		}
	};

	return (
		<div className="text-white font-large font-semibold">
			<div className="flex items-center justify-center gap-4">
				<div onClick={handleTimeClick}>
					{isClicked ? (
						<>
							<button className="text-black px-4 py-2 mr-2 mb-2 rounded-lg border-2 border-green">{time}</button>
							<button
								className="primary px-4 py-3 text-xl rounded-lg"
								onClick={handleNextButtonClick}>
								Next
							</button>
						</>
					) : (
						<div className="primary px-9 my-1 py-3 mx-auto rounded-lg">{time}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TimeSlots;
