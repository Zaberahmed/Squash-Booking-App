import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import authJWT from '../../Services/authJWT.service';
import { useLocation, useNavigate } from 'react-router-dom';
import User from '../../Interfaces/User.interface';

// interface Props {
// 	selectedTime: string;
// 	selectedDate: Date;
// 	slotName: string;
// }

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

	// console.log(typeof selectedDate);
	// console.log(selectedTime);
	// console.log(slotName);

	const [opponentId, setOpponentId] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');
	const [users, setUsers] = useState<User[]>([initialState]);
	const [selectedUserName, setSelectedUserName] = useState<string>('');

	const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		event.preventDefault();
		setOpponentId(event.target.value);
		console.log(event.target.value);
		const selectedUser = users.find((user) => user._id === event.target.value);
		if (selectedUser) {
			setSelectedUserName(selectedUser.name); // Save the selected user's name
		}
	};

	const handleRoleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		setSelectedRole(event.target.value);
		setOpponentId('');
	};

	const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const time = selectedTime;
		const date: Date = selectedDate;
		const slot: Object = { slotName, time };
		const peer: Object = { opponent: opponentId };
		const booking: Object = { date, slot, peer };

		const result = await authJWT.userBooking(booking);
		console.log(result);
		navigate('/user');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await authJWT.getAllUsers();
				console.log(result);
				setUsers(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="accent h-screen mt-24 rounded-t-3xl drop-shadow-2xl">
			<p className="font-serif text-center pt-16 ">Choose your opponent and Confirm Booking</p>
			<form
				className="flex justify-center items-center h-44"
				onSubmit={handleOnSubmit}>
				<div className="">
					<div className="mb-5">
						<label>
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
								className="ml-5"
							/>
							Member
						</label>
					</div>
					{selectedRole === 'instructor' && (
						<select
							value={opponentId}
							onChange={handleDropdownChange}>
							<option value="">Choose instructor </option>
							<option value="Instructor Option 1">Instructor Option 1</option>
							<option value="Instructor Option 2">Instructor Option 2</option>
							<option value="Instructor Option 3">Instructor Option 3</option>
						</select>
					)}
					{selectedRole === 'member' && (
						<select
							value={opponentId}
							onChange={handleDropdownChange}>
							<option value="">Choose member </option>
							{users.map((user) => (
								<option
									key={user._id}
									value={`${user._id}`}>
									{user.name}
								</option>
							))}
						</select>
					)}
				</div>
				<div>
					<h1>Booking Details</h1>
					<p>Date:{selectedDate}</p>
					<p>Time:{selectedTime}</p>
					<p>Opponent:{selectedUserName}</p>
				</div>
				<button
					className="text-center bg-green-400 rounded p-4 ml-32 "
					disabled={opponentId === ''}>
					confirm
				</button>
			</form>
		</div>
	);
};

export default SelectPerson;
