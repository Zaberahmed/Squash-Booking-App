import TimeSlot from '../Interfaces/TimeSlot';

const timeslots: TimeSlot[] = [
	{ slotName: 'A', time: '6:00 AM' },
	{ slotName: 'B', time: '7:00 AM' },
	{ slotName: 'C', time: '8:00 AM' },
	{ slotName: 'D', time: '9:00 AM' },
	{ slotName: 'E', time: '10:00 AM' },
	{ slotName: 'F', time: '11:00 AM' },
	{ slotName: 'G', time: '12:00 PM' },
	{ slotName: 'H', time: '1:00 PM' },
	{ slotName: 'I', time: '2:00 PM' },
	{ slotName: 'J', time: '3:00 PM' },
	{ slotName: 'K', time: '4:00 PM' },
	{ slotName: 'L', time: '5:00 PM' },
	{ slotName: 'M', time: '6:00 PM' },
	{ slotName: 'N', time: '7:00 PM' },
	{ slotName: 'O', time: '8:00 PM' },
	{ slotName: 'P', time: '9:00 PM' },
];

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
