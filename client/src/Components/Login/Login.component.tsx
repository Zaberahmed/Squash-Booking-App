import { ChangeEvent, FormEvent, useState } from 'react';
import auth from '../../utils/auth';
// import authJWT from '../Services/authJWT.service';
import { useNavigate } from 'react-router-dom';
// import authJWT from '../../Services/authJWT.service';

interface Props {
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	isAuthenticated: boolean;
}

const initialState = {
	email: '',
	password: '',
};

const Login = (props: Props) => {
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
		// const loginData = await authJWT.login(user);
		// if (loginData) {
		// 	localStorage.setItem('accessToken', loginData.accessToken);
		// 	props.setIsAuthenticated(true);
		// 	auth.login(() => navigate('/user'));
		// }

		setTimeout(() => {
			props.setIsAuthenticated(true);
			auth.login(() => navigate('/user'));
		}, 500);
	};

	const validateForm = () => {
		return !state.email || !state.password;
	};

	return (
		<div className="w-screen h-screen flex flex-col items-center bg-amber-50">
			<h2 className="text-2xl font-bold mb-4 mt-5">Login</h2>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-4 flex flex-col">
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

				<button
					type="submit"
					className="bg-orange-400 hover:bg-orange-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-white text-l font-semibold text-m px-4 py-2 border rounded-full mt-3"
					disabled={validateForm()}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
