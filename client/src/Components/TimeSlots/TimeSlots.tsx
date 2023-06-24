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
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const navigate = useNavigate();
	const handleNextButtonClick = () => {
		setIsClicked(true);
		setselectedTime(time);

		// navigate('/selectperson', { state: { selectedTime: selectedTime,
		//    selectedDate: selectedDate.toISOString(), slotName: slotName } });
		// Handle next button click logic here
		console.log(`Next button clicked for time slot: ${time}`);
	};

	const handleButtonClick = async () => {
		// console.log(`Button clicked for time slot: ${time}`);
		navigate('/selectperson', { state: { selectedTime: selectedTime, selectedDate: selectedDate.toISOString(), slotName: slotName } });
		// setselectedTime(time);
		console.log(selectedTime);
		// console.log(`Date: ${selectedDate}, Time: ${selectedTime}`);
		// console.log(selectedTime.valueOf());
	};

	// const handleMouseEnter = () => {
	// 	setShowButtons(false);
	// };

	// const handleMouseLeave = () => {
	// 	setShowButtons(true);
	// };

	return (
		<div className="">
			{/* {showButtons && <p className="accent rounded-md p-5 m-5 text-center text-black">{time}</p>} */}
			{/* {
        isClicked && <button
        onClick={handleButtonClick}
        className='text-center accent px-10 py-4 mb-2 '>
          next
          </button>
      } */}
			{showButtons && (
				<div className="flex justify-center gap-2">
					<button
						onClick={handleNextButtonClick}
						className={`flex flex-col sm:flex-row border-2 border-yellow-400 bg-yellow-50 rounded-md px-10 py-4 mb-2
         ${isClicked ? 'rotate-animation' : ''}`}>
						{isClicked ? (
							<>
								<button onClick={handleButtonClick}>next</button>
							</>
						) : (
							time
						)}
					</button>

					{/* <button
						className=""
						onClick={handleNextButtonClick}>
						Next
					</button> */}
				</div>
			)}
		</div>
	);
};

export default TimeSlots;
