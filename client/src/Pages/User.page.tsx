import { useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineUpcoming } from 'react-icons/md';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Authentication from '../Interfaces/Authentication.interface';

const UserPage = (props: Authentication) => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkcredential = () => {
			if (!props.isAuthenticated) navigate('/login');
		};
		// checkcredential();
	}, []);

	return (
		<div className="h-screen flex flex-col justify-between">
			<Outlet />
			<div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-2 px-4 flex justify-around items-center">
				<Link to="calender">
					<BsFillJournalBookmarkFill />
				</Link>
				<Link to="profile">
					<CgProfile />
				</Link>

				<Link to="upcoming">
					<MdOutlineUpcoming />
				</Link>
			</div>
		</div>
	);
};

export default UserPage;
