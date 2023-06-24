import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminPage = () => {
	return (
		<div className="h-screen flex flex-col justify-between">
			<Outlet />
			<div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2 px-4 flex justify-around items-center">
				<Link to="event">Events</Link>
				<Link to="bookings">Bookings</Link>
				<Link to="members">Members</Link>
				<Link to="upcomingevents">Upcoming Events</Link>
			</div>
		</div>
	);
};

export default AdminPage;
