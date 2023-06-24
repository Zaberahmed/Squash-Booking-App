import { useEffect, useState } from 'react';
import './Upcoming.component.css';
import authJWT from '../../Services/authJWT.service';


const Upcoming = () => {
	const [upcomings, setUpcomings] = useState<any[]>();
	const formatTime = (timeString: string): string => {
		const time = timeString.toLowerCase();
		const hour = time.substring(0, time.length - 2);
		const period = time.substring(time.length - 2);

		let formattedHour = parseInt(hour, 10);
		if (formattedHour < 10) {
			formattedHour = 0 + formattedHour;
		}

		return `${formattedHour}:00 ${period.toUpperCase()}`;
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await authJWT.userUpcoming({ date: new Date() });
				setUpcomings(result);
				console.log(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);
	return (
		<div>
			{upcomings?.map((upcoming) => (
				<div className="upcoming-card">
					<div className="card-content flex justify-center gap-5">
						<div className="accent p-4 rounded">
							<p>
								{new Date(upcoming.date).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</div>
						<div className="">
							<p>
								<strong>Time: </strong>
								{formatTime(upcoming.slot.time)}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Upcoming;
