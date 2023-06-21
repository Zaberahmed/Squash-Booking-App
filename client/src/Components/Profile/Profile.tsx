import { useState, useEffect } from 'react';
import User from '../../Interfaces/User.interface';
import authJWT from '../../Services/authJWT.service';
import './Profile.css';

const initialState: User = {
	name: '',
	membershipId: '',
	phone: '',
	email: '',
	password: '',
};
const Profile = () => {
	const [profile, setProfile] = useState<User>(initialState);

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
					<strong>Contact Details:</strong> 123-456-7890
				</p>
			</div>

			<button className="logout-button">Logout</button>
		</div>
	);
};

export default Profile;
