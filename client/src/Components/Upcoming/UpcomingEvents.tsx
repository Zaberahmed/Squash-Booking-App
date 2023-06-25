import { useEffect, useState } from 'react';
import './UpcomingEvents.css';
import AdminJWT from '../../Services/AdminJWT.service';

interface Slot {
  slotName: string;
  date: Date;
}

interface Event {
  user: string;
  slot: Slot;
  _id: string;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AdminJWT.bookingLists();
        console.log(result);
        setEvents(result);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='center'>
        <h1>Upcoming Events</h1>
      </div>
      <div className='cards'>
        {events.map((eventItem) => (
          <div className='card' key={eventItem._id}>
            <h3 className='card-name'>
              <strong>User Name: {eventItem.user}</strong>
            </h3>
            <h3 className='card-name'>
              <strong>Slot Name: {eventItem.slot.slotName}</strong>
            </h3>
            <h3 className='card-name'>
              <strong>Time: {eventItem.slot.time.toString()}</strong>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
