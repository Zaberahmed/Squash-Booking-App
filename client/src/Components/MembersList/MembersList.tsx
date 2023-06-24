import { useEffect, useState } from 'react';
import './MembersList.css';
import User from '../../Interfaces/User.interface';
import authJWT from '../../Services/UserJWT.service';

const initialState: User[] = [];

const MembersList = () => {
	const [member, setMember] = useState<User[]>(initialState);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await authJWT.membersList();
				console.log(result);
				setMember(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container">
			<div className="center">
				<h1>Members List</h1>
			</div>
			<div className="cards">
				{member.map((memberItem) => (
					<div
						className="card bg-gradient-to-r from-cyan-100 to-blue-200"
						key={memberItem.membershipId}>
						<h3 className="card-name font-sans">Name: {memberItem.name}</h3>
						<h3 className="card-name font-sans">Email: {memberItem.email}</h3>
						<h3 className="card-name font-sans">Phone: {memberItem.phone}</h3>
						<a
							href="#"
							className="btn bg-purple-200 font-serif">
							membership ID: {memberItem.membershipId}
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default MembersList;
