import { useEffect, useState } from 'react';
import User from '../../../Interfaces/User.interface';
import './Profile.component.css';
import UserService from '../../../Services/User.service';
import { useNavigate } from 'react-router-dom';
import auth from '../../../utils/authentication';
import Cookies from 'js-cookie';
import History from '../History/History.component';
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
		<div>
			<div className="profile-card">
				<div className="profile-details">
					<h2>Profile</h2>
					<p>
						<strong>Name:</strong> {profile.name}
					</p>
					<p>
						<strong>Membership ID:</strong> {profile.membershipId}
					</p>
					<p>
						<strong>Email:</strong> {profile.email}
					</p>
					<p>
						<strong>Contact Details:</strong>
						{profile.phone}
					</p>
				</div>
				<button
					className="logout-button"
					onClick={async () => {
						await UserService.logout();
						props.setIsAuthenticated(false);
						localStorage.clear();
						Cookies.remove('accessToken');

						auth.logout(() => {
							navigate('/login');
						});
					}}>
					Logout
				</button>
			</div>
			<div>
				<History />
			</div>
		</div>
	);
};

export default Profile;
