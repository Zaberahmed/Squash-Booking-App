import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import TabComponent from '../Components/Tab/Tab.component';

const AdminPage = () => {
	// const navigate = useNavigate();
	
	
	
  
	return (
		<div className="h-screen flex flex-col justify-between">
			<Outlet />
			<div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2 px-4 flex justify-around items-center">
				<Link to="event">Events</Link>
				<Link to="bookings" 
				>Bookings</Link>
				<Link to="members">Members</Link>

				{/* <Link to="upcomingevents" state={{upcoming:upcomingEvents}}>
					Upcoming Events</Link> */}

				{/* {bookings &&
					<TabComponent

					
					/>
				} */}
			</div>
		</div>
	);
};

export default AdminPage;
