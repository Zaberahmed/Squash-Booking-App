import React,{useState} from 'react';
import './AdminTimeSlots.css';


const AdminTimeSlots = () => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleTimeClick = (time: string) => {
    if (selectedTimes.includes(time)) {
      // If the time is already selected, remove it from the array
      setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== time));
    } else {
      // If the time is not selected, add it to the array
      setSelectedTimes([...selectedTimes, time]);
    }
  };
  console.log(selectedTimes);
  const selectedAllTimes = ()=>{
    const allTimes = timeSlotsForAdmin.map((timeSlot)=> timeSlot.time);
    setSelectedTimes(allTimes);
  }

  const timeSlotsForAdmin = [
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
  ]
  return (
            
   <div className="">
    <button onClick={selectedAllTimes}>All</button>
    <div className="grid grid-cols-3 ">
      {
        timeSlotsForAdmin.map((time)=><>
        <button
            key={time.slotName}
            className={`p-4 bg-yellow-100 border-2 border-yellow-400 rounded-md m-2 ${
              selectedTimes.includes(time.time) ? 'disabled bg-white text-gray-400' : ''
            }`}
            onClick={() => handleTimeClick(time.time)}
            disabled={selectedTimes.includes(time.time)}
          >
            {time.time}
          </button>
        </>)
      }
    </div>
    
<button className='text-end'>Next</button>

<div className="">
<input type="text" placeholder='events name' />
<button>Add</button>
</div>
   </div>
  );
};

export default AdminTimeSlots;
