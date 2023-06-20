import { useState, ChangeEvent, FormEvent } from 'react';

import auth from '../../utils/auth';
// import authJWT from '../Services/authJWT.service';
import { useNavigate } from 'react-router-dom';
import User from '../../Interfaces/User.interface';
import authJWT from '../../Services/authJWT.service';

const initialState: User = {
	name: '',
	membershipId: '',
	phone: '',
	email: '',
	password: '',
};

interface Props {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	isAuthenticated: boolean;
}

const Register = (props: Props) => {
	const navigate = useNavigate();
	const [state, setState] = useState<User>(initialState);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData: FormData = new FormData(form);

		const user = Object.fromEntries(formData);
		console.log(user);
		const registerData = await authJWT.register(user);
		const loginData = await authJWT.login(user);
		if (registerData && loginData) {
			localStorage.setItem('accessToken', loginData.accessToken);
			props.setIsAuthenticated(true);
			auth.login(() => navigate('/profile'));
		}
	};

	const validateForm = (): boolean => {
		return !state.name || !state.membershipId || !state.phone || !state.email || !state.password;
	};

	return (
		<div className="w-screen h-screen flex flex-col items-center  min-h-screen bg-amber-100 ">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-4">
				<div className="container">
					<p className="mb-4">Please fill in this form to create an account.</p>

					<label
						htmlFor="name"
						className="mb-2">
						<b>Name</b>
					</label>
					<input
						type="text"
						placeholder="John Doe"
						name="name"
						value={state.name}
						onChange={handleChange}
						className="w-full border rounded py-2 px-3 mb-2"
					/>

					<label
						htmlFor="membershipId"
						className="mb-2">
						<b>Membership ID</b>
					</label>
					<input
						type="text"
						placeholder="PA-XX"
						name="membershipId"
						value={state.membershipId}
						onChange={handleChange}
						className="w-full border rounded py-2 px-3 mb-2"
					/>

					<label
						htmlFor="phone"
						className="mb-2">
						<b>Mobile Number</b>
					</label>
					<input
						type="text"
						placeholder="01XXXXXXXXX"
						name="phone"
						value={state.phone}
						onChange={handleChange}
						className="w-full border rounded py-2 px-3 mb-2"
					/>

					<label
						htmlFor="email"
						className="mb-2">
						<b>Email</b>
					</label>
					<input
						type="email"
						placeholder="example@example.com"
						name="email"
						value={state.email}
						onChange={handleChange}
						className="w-full border rounded py-2 px-3 mb-2"
					/>

					<label
						htmlFor="password"
						className="mb-2">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="XXXXXXXX"
						name="password"
						value={state.password}
						onChange={handleChange}
						className="w-full border rounded py-2 px-3 mb-2"
					/>

					<button
						type="submit"
						className="registerbtn bg-orange-400 hover:bg-orange-600 text-white text-m px-4 py-2  border rounded-full mt-1"
						disabled={validateForm()}>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
