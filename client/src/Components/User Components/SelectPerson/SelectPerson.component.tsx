import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import UserService from '../../../Services/User.service';
import { useLocation, useNavigate } from 'react-router-dom';
import User from '../../../Interfaces/User.interface';

const initialState: User = {
	name: 'John Doe',
	membershipId: 'PA-XX',
	phone: '01XXXXXXXXX',
	email: 'example@example.com',
	password: 'XXXXXXXX',
};

const SelectPerson = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { selectedTime, selectedDate, slotName } = location.state;
	console.log(selectedDate);

	const [partnerId, setPartnerId] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');
	const [users, setUsers] = useState<User[]>([initialState]);
	const [selectedPartnerName, setSelectedPartnerName] = useState<string>('');
	const [userName, setUserName] = useState<string>('');

	const handleDropdownChange = async (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setPartnerId(event.target.value);
		console.log(event.target.value);
		const selectedUser = users.find((user) => user._id === event.target.value);
		if (selectedUser) {
			setSelectedPartnerName(selectedUser.name); // Save the selected user's name
		}
	};

	const handleRoleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSelectedRole(event.target.value);
		setPartnerId('');
	};

	const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const time = selectedTime;
		const date = selectedDate;
		const slot = { slotName, time };
		const peer = { opponent: partnerId };
		const booking = { date, slot, peer };

		const result = await UserService.bookCourt(booking);
		console.log(result);
		navigate('/user');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await UserService.getUsers();
				console.log(user);
				setUsers(user);
				const profile = await UserService.profile();
				console.log(profile);
				setUserName(profile.name);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="font-bold">
			<p className="text-green text-2xl text-center">Slot Summary</p>

			<div className="py-5 grid grid-cols-1 gap-1">
				<p>Name:{userName}</p>
				<p>Date: {new Date(selectedDate).toLocaleDateString('en-UK')}</p>
				<p>Time: {selectedTime}</p>
				<p>Partner: {selectedPartnerName}</p>
			</div>
			<form
				className="flex flex-col items-center justify-center h-44"
				onSubmit={handleOnSubmit}>
				<div className="mb-5 flex flex-row justify-center">
					<label className="mr-5">
						<input
							type="radio"
							value="instructor"
							checked={selectedRole === 'instructor'}
							onChange={handleRoleChange}
						/>
						Instructor
					</label>
					<label>
						<input
							type="radio"
							value="member"
							checked={selectedRole === 'member'}
							onChange={handleRoleChange}
						/>
						Member
					</label>
				</div>
				<div className="mb-5 flex flex-col items-center">
					{selectedRole === 'instructor' && (
						<select
							value={partnerId}
							onChange={handleDropdownChange}>
							<option value="">Choose instructor</option>
							<option value="Instructor Option 1">Instructor Option 1</option>
							<option value="Instructor Option 2">Instructor Option 2</option>
							<option value="Instructor Option 3">Instructor Option 3</option>
						</select>
					)}
					{selectedRole === 'member' && (
						<select
							value={partnerId}
							onChange={handleDropdownChange}>
							<option value="">Choose member</option>
							{users.map((user) => (
								<option
									key={user._id}
									value={user._id}>
									{user.name}
								</option>
							))}
						</select>
					)}
				</div>

				<button
					className="text-center bg-green-400 rounded p-4"
					disabled={partnerId === ''}>
					Confirm
				</button>
			</form>
		</div>
	);
};

export default SelectPerson;
