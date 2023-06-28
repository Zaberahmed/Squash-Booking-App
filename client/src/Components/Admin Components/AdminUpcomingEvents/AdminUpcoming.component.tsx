import { useEffect, useState } from 'react';
import AdminService from '../../../Services/Admin.service';
import Event from '../../../Interfaces/Event.interface';

const AdminUpcoming = () => {
	const [events, setEvents] = useState<Event[]>([]);

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
				const results = await AdminService.getEvents();

				setEvents(results);
				console.log(results);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{events.map((event) => (
				<div
					className="text-center"
					key={event._id}>
					<p>{event.title}</p>
					<p>{event.type}</p>
					{event.type === 'special event' && event.dates ? (
						<div>
							<p>Start Date: {event.dates[0].toLocaleString()}</p>
							<p>End Date: {event.dates[event.dates.length - 1].toLocaleString()}</p>
						</div>
					) : (
						<p>No dates available</p>
					)}
				</div>
			))}
		</div>
	);
};

export default AdminUpcoming;
