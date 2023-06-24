import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface Props {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	isAuthenticated: boolean;
}
const UserPage = (props: Props) => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkcredential = () => {
			if (!props.isAuthenticated) navigate('/login');
		};
		checkcredential();
	}, []);

	return (
		<div className="">
			<nav>
				<Link to="calender">Book Now</Link>
				<Link to="profile">Profile</Link>
				<Link to="history">History</Link>
				<Link to="upcoming">Upcoming</Link>
			</nav>

			<Outlet />
		</div>
	);
};

export default UserPage;
