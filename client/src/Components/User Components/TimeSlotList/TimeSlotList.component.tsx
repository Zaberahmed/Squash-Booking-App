import { useLocation, useNavigate } from 'react-router-dom';
import TimeSlots from '../TimeSlots/TimeSlots.component';
import TimeSlot from '../../../Interfaces/Timeslot.interface';
import { SlArrowLeftCircle } from 'react-icons/sl';

function TimeSlotsList() {
	const iconSize = 24;
	const location = useLocation();
	const timeSlots = location.state.timeSlots;
	const selectedDate = location.state.selectedDate;

	const navigate = useNavigate();
	return (
		<div className="">
			<button
				className="font-bold m-5 flex justify-center gap-3"
				onClick={() => navigate('/user/calender')}>
				<SlArrowLeftCircle size={iconSize} />
				Go Back
			</button>

			<div className="flex justify-center ">
				<div className=" p-5 border-2   border-green rounded-lg grid grid-cols-1 overflow-y-scroll ">
					{timeSlots.map((slot: TimeSlot) => (
						<TimeSlots
							key={slot.slotName}
							selectedDate={selectedDate}
							time={slot.time}
							slotName={slot.slotName}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default TimeSlotsList;
