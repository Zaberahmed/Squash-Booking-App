import { useState, ChangeEvent, FormEvent } from 'react';
import auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import User from '../../Interfaces/User.interface';
import authJWT from '../../Services/User.service';
import Cookies from 'js-cookie';
import './Register.css';

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
	const routeChange = () => {
		const path = `/admin/members`;
		navigate(path);
	};

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
		// const loginData = await authJWT.login(user);
		// if (registerData && loginData) {
		//   localStorage.setItem('accessToken', loginData.accessToken);
		//   Cookies.set('accessToken', loginData.accessToken);
		//   props.setIsAuthenticated(true);
		//   auth.login(() => navigate('/user'));
		// }

		// props.setIsAuthenticated(true);
		// auth.login(() => navigate('/user'));
	};

	const validateForm = (): boolean => {
		return !state.name || !state.membershipId || !state.phone || !state.email || !state.password;
	};

	const [showModal, setShowModal] = useState(false);

	return (
		<div className="w-screen h-screen sm:h-10 flex flex-col items-center bg-amber-100">
			<h2 className="text-2xl font-bold mt-5 mb-4">Register a member</h2>
			{/* <p className='mb-4'>Please fill in this form to create an account.</p> */}
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

				{/* <button
          type='submit'
          className='bg-yellow-300 hover:bg-yellow-400 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-black text-l font-semibold text-m px-4 py-2 border rounded-full mt-3 cursor-pointer'
          disabled={validateForm()}
        >
          Register
        </button> */}
				<button
					className="bg-yellow-300 hover:bg-yellow-400 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-black text-l font-semibold text-m px-4 py-2 border rounded-full mt-3 cursor-pointer"
					type="submit"
					onClick={() => setShowModal(true)}
					disabled={validateForm()}>
					Register
				</button>
				{showModal ? (
					<>
						<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
							<div className="relative w-auto my-6 mx-auto max-w-3xl">
								{/*content*/}
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									{/*header*/}
									<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
										{/* <h3 className='text-3xl font-semibold'>Modal Title</h3> */}
										{/* <button
                      className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}
                    >
                      <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button> */}
									</div>
									{/*body*/}
									<div className="relative p-6 flex-auto">
										<p className="my-4 text-slate-500 text-lg leading-relaxed">Account created successfully!</p>
									</div>
									{/*footer*/}
									<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
										{/* <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button> */}
										<button
											className="bg-yellow-300 hover:bg-yellow-400 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-black text-l font-semibold text-m px-4 py-2 border rounded-full mt-3 cursor-pointer"
											type="button"
											// onClick={() => setShowModal(false)}
											onClick={routeChange}>
											OK
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</>
				) : null}
			</form>
		</div>
	);
};

export default Register;
