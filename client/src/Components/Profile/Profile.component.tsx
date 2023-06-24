import { useEffect, useState } from 'react';
import User from '../../Interfaces/User.interface';
import './Profile.component.css';
import authJWT from '../../Services/UserJWT.service';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';
import Cookies from 'js-cookie';
import History from '../History/History.component';

const initialState: User = {
	name: 'John Doe',
	membershipId: 'PA-XX',
	phone: '01XXXXXXXXX',
	email: 'example@example.com',
	password: 'XXXXXXXX',
};

interface Props {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	isAuthenticated: boolean;
}

const Profile = (props: Props) => {
	const [profile, setProfile] = useState<User>(initialState);

	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await authJWT.userProfile();
				console.log(result);
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
					onClick={() => {
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
