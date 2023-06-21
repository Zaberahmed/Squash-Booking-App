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
			auth.login(() => navigate('/user'));
		}
		// setTimeout(() => {
		// 	props.setIsAuthenticated(true);
		// 	auth.login(() => navigate('/user'));
		// }, 500);
	};

	const validateForm = (): boolean => {
		return !state.name || !state.membershipId || !state.phone || !state.email || !state.password;
	};

	return (
		<div className="w-screen h-screen sm:h-10 flex flex-col items-center bg-amber-100">
			<h2 className="text-2xl font-bold mt-5 mb-4">Register</h2>
			<p className="mb-4">Please fill in this form to create an account.</p>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-4 flex flex-col">
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
					className=" bg-yellow-300 hover:bg-yellow-400 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-black text-l font-semibold text-m px-4 py-2 border rounded-full mt-3 cursor-pointer"
					disabled={validateForm()}>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
