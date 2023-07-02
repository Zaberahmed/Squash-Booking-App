import { useEffect, useState } from 'react';
import User from '../../../Interfaces/User.interface';
import UserService from '../../../Services/User.service';
import { useNavigate } from 'react-router-dom';
import auth from '../../../utils/authentication';
import Cookies from 'js-cookie';
import Authentication from '../../../Interfaces/Authentication.interface';

const initialState: User = {
	name: 'John Doe',
	membershipId: 'PA-XX',
	phone: '01XXXXXXXXX',
	email: 'example@example.com',
	password: 'XXXXXXXX',
};

const Profile = (props: Authentication) => {
	const [profile, setProfile] = useState<User>(initialState);

	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await UserService.profile();
				// console.log(result);
				setProfile(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div
			className="secondary rounded-tr-full rounded-bl-full p-5 height-full text-2xl"
			style={{ boxShadow: '0px -2px 6px rgba(0, 0.5, 0, 0.5)', zIndex: 999 }}>
			<div className="grid grid-cols-1 gap-1">
				<h2 className="text-center text-green font-extrabold text-2xl">Profile</h2>
				<hr />
				<p>
					<strong>Name:</strong> {profile.name}
				</p>
				<p>
					<strong> ID#</strong> {profile.membershipId}
				</p>
				<p>
					<strong>Email:</strong> {profile.email}
				</p>
				<p>
					<strong>Contact: </strong>
					{profile.phone}
				</p>

				<div className="flex justify-between">
					<button
						className="primary text-white p-1 rounded-lg"
						onClick={() => navigate('/user/history')}>
						<strong>History</strong>
					</button>

					<button
						className="logout-button"
						onClick={async () => {
							// ...
						}}>
						<strong className="red">Logout</strong>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
