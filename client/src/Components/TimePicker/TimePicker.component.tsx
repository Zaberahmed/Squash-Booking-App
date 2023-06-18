import './TimePicker.component.css';
function TimePicker() {
	const timeSlots = [
		{ time: '6:00 PM - 7:00 PM', slotId: 'a' },
		{ time: '7:00 PM - 8:00 PM', slotId: 'b' },
		{ time: '8:00 PM - 9:00 PM', slotId: 'c' },
		{ time: '9:00 PM - 10:00 PM', slotId: 'd' },
	];
	return (
		<div className="timeslot-container">
			{timeSlots.map((time) => (
				<p>{time.time}</p>
			))}
		</div>
	);
}
export default TimePicker;
