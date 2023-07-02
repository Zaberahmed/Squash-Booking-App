import { ChangeEvent, FormEvent, useState } from 'react';
import auth from '../../utils/authentication';
import { useNavigate } from 'react-router-dom';
import UserService from '../../Services/User.service';
import Cookies from 'js-cookie';
import Authentication from '../../Interfaces/Authentication.interface';

const initialState = {
	email: '',
	password: '',
};

const Login = (props: Authentication) => {
	let navigate = useNavigate();
	const [state, setState] = useState(initialState);

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
		const loginData = await UserService.login(user);
		if (loginData) {
			localStorage.setItem('accessToken', loginData.accessToken);
			Cookies.set('accessToken', loginData.accessToken);
			props.setIsAuthenticated(true);
			auth.login(() => navigate('/user'));
		}
	};

	const validateForm = () => {
		return !state.email || !state.password;
	};

	return (
		<div className="w-screen h-screen flex flex-col items-center">
			<h2 className="text-3xl font-bold mb-4 mt-5">Login</h2>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-4 flex flex-col shadow-sm">
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
					className="w-full border rounded py-2 px-3 mb-2 "
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
					className="w-full border-2 rounded py-2 px-3 mb-2 "
				/>

				<div className="primary text-white text-l font-semibold text-m px-4 py-2 border rounded-md mt-3 cursor-pointer text-center">
					<button
						type="submit"
						disabled={validateForm()}>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
