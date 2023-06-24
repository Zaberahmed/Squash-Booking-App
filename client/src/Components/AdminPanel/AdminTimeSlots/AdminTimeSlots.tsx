import React from 'react';
import './AdminTimeSlots.css';


const AdminTimeSlots = () => {
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
    // <div className='time-picker-container'>
    //   <div className='time-picker'>
    //     <div className='row time-picker-header'>
    //       <div className='row'>
    //         <ul className='time-slot'>
    //           <li className='time-slot-item'>9:00 </li>
    //           <li className='time-slot-item'>10:00 - 10:30</li>
    //           <li className='time-slot-item'>11:00 - 11:30</li>
             
    //         </ul>
    //         <ul className='time-slot'>
    //           <li className='time-slot-item'>8:00 - 8:30</li>
    //           <li className='time-slot-item'>10:00 - 10:30</li>
    //           <li className='time-slot-item'>11:00 - 11:30</li>
    //         </ul>
    //         <ul className='time-slot'>
    //           <li className='time-slot-item'>9:00 - 9:30</li>
    //           <li className='time-slot-item'>10:00 - 10:30</li>
    //           <li className='time-slot-item'>11:00 - 11:30</li>
    //           <li className='time-slot-item'>12:00 - 12:30</li>
    //           <li className='time-slot-item'>13:00 - 13:30</li>
    //         </ul>
    //         <ul className='time-slot'>
    //           <li className='time-slot-item'>9:00 - 9:30</li>
    //           <li className='time-slot-item picked'>10:00 - 10:30</li>
    //           <li className='time-slot-item'>11:00 - 11:30</li>
    //           <li className='time-slot-item'>12:00 - 12:30</li>
    //         </ul>
    //         <ul className='time-slot'>
    //           <li className='time-slot-item'>9:00 - 9:30</li>
    //           <li className='time-slot-item'>10:00 - 10:30</li>
    //           <li className='time-slot-item'>11:00 - 11:30</li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
   <div className="">
    <div className="grid grid-cols-3 ">
      {
        timeSlotsForAdmin.map((time)=><>
       <p className='p-4 bg-yellow-100 border-2
        border-yellow-400 rounded-md m-2'> {time.time}</p>
        </>)
      }
    </div>
    <button>go back</button>

   </div>
  );
};

export default AdminTimeSlots;
