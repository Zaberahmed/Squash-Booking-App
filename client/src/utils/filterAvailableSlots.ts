import TimeSlot from '../Interfaces/Timeslot.interface';

const filterAvailableSlots = async (timeslots: TimeSlot[]) => {
	const currentTime = new Date().getHours();
	// console.log(currentTime);
	const filteredSlots = timeslots.filter((slot) => {
		const slotHour = parseInt(slot.time.split(':')[0]);
		return slotHour !== currentTime;
	});
	return filteredSlots;
};

export default filterAvailableSlots;
