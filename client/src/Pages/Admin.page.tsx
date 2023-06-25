import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import authJWT from '../Services/authJWT.service';
import TabComponent from '../Components/Tab/Tab.component';

const AdminPage = () => {
	// const navigate = useNavigate();
	// const [bookings,setBookings] = useState<any[]>([]);
	// const [pastEvents,setPastEvents] = useState<any[]>([])
	// const [upcomingEvents,setUpcomingEvents] = useState<any[]>([])
	// const today = new Date().toISOString();
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 	  try {
	// 		const result = await authJWT.bookingsList();
	// 		console.log(result);
	// 		setBookings(result);
	// 	  } catch (error) {
	// 		// Handle error
	// 		console.log(error);
	// 	  }
	// 	};
	
	// 	fetchData();
	//   }, []);
	//   const filterBookings = (booking:any) =>{
	// 	const bookingTime = new Date(booking.date).toISOString();
	// 	return bookingTime >= today;
	//   }
	//   const pastBookings = bookings.filter((booking) => !filterBookings(booking));
	//   const upComingBookings = bookings.filter(filterBookings);
	//   setPastEvents(pastBookings);
	//   setUpcomingEvents(upComingBookings);
  
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
