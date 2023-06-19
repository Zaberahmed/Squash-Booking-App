// import landingImage from './../../assets/landingImage.jpg';
import { Link } from 'react-router-dom';
import download from '../../assets/download.jpeg';

function Landing() {
	return (
		<div>
			<h2 className="font-bold text-3xl mt-16">Book a Squash Court</h2>
			<br />
			<p>Challenge your friend and play together a game of squash</p>
			<br />
			<img
				src={download}
				alt=""
			/>
			<br />
			<br />
			<Link
				to="/register"
				className="rounded-full bg-orange-400 p-4">
				Sign Up for an Account
			</Link>
			<br />
			<p>Already a member?</p>
			<Link
				to="/login"
				className="rounded-full bg-orange-400 p-4">
				login
			</Link>
		</div>
	);
}

export default Landing;
