import { Link } from 'react-router-dom';
import LandingImage from './../../assets/LandingImage.jpg';

function Landing() {
	return (
		<div className="w-screen h-screen flex flex-col items-center">
			<h2 className="font-bold text-3xl mt-16 mb-4 text-center text-slate-800">Book a Squash Court</h2>

			<img
				src={LandingImage}
				alt="Squash playing logo"
			/>

			<Link to="/register">
				<button className="bg-orange-400 hover:bg-orange-600 text-white text-m px-4 py-2  border rounded-full mt-6">Sign Up for an Account</button>
			</Link>

			<p className="mt-3  text-slate-800">Already a member?</p>

			<Link to="/login">
				<button className="bg-orange-400 hover:bg-orange-600 text-white text-m px-4 py-2  border rounded-full mt-1">Login</button>
			</Link>
		</div>
	);
}

export default Landing;
