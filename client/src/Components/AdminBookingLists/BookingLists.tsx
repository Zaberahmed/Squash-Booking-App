import React from 'react';
// import Upcoming from '../Upcoming/Upcoming';
import History from '../History/History';
import UpcomingEvents from '../Upcoming/UpcomingEvents';
import PastEvents from '../History/PastEvents';

const BookingLists = () => {
  return (
    <div>
      <UpcomingEvents />
      <PastEvents />
    </div>
  );
};

export default BookingLists;
