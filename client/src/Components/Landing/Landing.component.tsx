import { Link } from 'react-router-dom';
import lImage from '../../assets/lImage.jpg';

function Landing() {
	return (
		<div className="">
			<h2 className="">Book a Squash Court</h2>

			<img
				src={lImage}
				alt="Squash playing logo"
			/>

			<Link to="/login">
				<button className="">Login</button>
			</Link>
		</div>
	);
}

export default Landing;
