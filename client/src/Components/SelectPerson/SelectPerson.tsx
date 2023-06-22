import { useState, ChangeEvent, FormEvent } from 'react';
import authJWT from '../../Services/authJWT.service';
import { useLocation } from 'react-router-dom';

interface Props {
	selectedTime: string;
	selectedDate: Date;
}
const SelectPerson: React.FC<Props> = () => {
	const location = useLocation();
	const { selectedTime, selectedDate, slotName } = location.state;
	console.log(selectedDate);
	console.log(selectedTime);
	console.log(slotName);

	const [selectedOption, setSelectedOption] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<string>('');

	const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		event.preventDefault();
		setSelectedOption(event.target.value);
		console.log(event.target.value);
	};

	const handleRoleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		setSelectedRole(event.target.value);

		setSelectedOption('');
	};

	const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const time = selectedTime;
		const date: Date = selectedDate;
		const slot: Object = { slotName, time };
		const peer: Object = { opponent: selectedOption };
		const booking: Object = { date, slot, peer };

		const result = await authJWT.userBooking(booking);
		console.log(result);
	};

	return (
		<div className="accent h-screen mt-24 rounded-t-3xl drop-shadow-2xl">
			<h1 className="font-serif text-center pt-16 ">You want to play with</h1>
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
							value={selectedOption}
							onChange={handleDropdownChange}>
							<option value="">Choose instructor </option>
							<option value="Instructor Option 1">Instructor Option 1</option>
							<option value="Instructor Option 2">Instructor Option 2</option>
							<option value="Instructor Option 3">Instructor Option 3</option>
						</select>
					)}
					{selectedRole === 'member' && (
						<select
							value={selectedOption}
							onChange={handleDropdownChange}>
							<option value="">Choose member </option>
							<option value="64912a3a9864a5bfa9c06ff0">Zaber</option>
							<option value="6492f7fee2f7cf392aeda4ff"> Rafia</option>
							<option value="649456bf55918c25cb60fcb7"> Asif</option>
						</select>
					)}
				</div>
				<button
					className="text-center bg-blue-200 rounded p-4 ml-32 "
					disabled={selectedOption === ''}>
					confirm
				</button>
			</form>
		</div>
	);
};

export default SelectPerson;
