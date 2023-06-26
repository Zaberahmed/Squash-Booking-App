import { useEffect, useState } from 'react';
import './History.component.css';
import UserService from '../../../Services/User.service';
import Booking from '../../../Interfaces/Booking.interface';

const History = () => {
	const [histories, setHistories] = useState<Booking[]>();

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
				const results = await UserService.pastBookings({ date: new Date().toLocaleDateString() });
				results.sort((a: Booking, b: Booking) => new Date(b.date).getTime() - new Date(a.date).getTime());
				// console.log(results[0].peer[0].opponent);
				const modifiedResult = await Promise.all(
					results.map(async (result: Booking) => {
						const opponentId = result.peer?.[0]?.opponent;
						// console.log(opponentId);
						const opponent = await UserService.getUser({ _id: opponentId });
						// console.log(opponent);
						if (result.peer && result.peer[0]) {
							result.peer[0].opponentName = opponent.name;
						}
						return result;
					})
				);
				// console.log(modifiedResult);
				setHistories(modifiedResult);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="">
			<h2 className="text-center">Previous Matches</h2>
			{histories?.map((history) => (
				<div
					className="history-card"
					key={history._id}>
					<div className="card-content flex justify-center gap-5">
						<div className="accent p-4 rounded">
							<p>
								{new Date(history.date).toLocaleDateString('en-US', {
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
								{formatTime(history.slot.time)}
							</p>
							<p key={history._id}>
								<strong>Partner: </strong>
								{history.peer?.[0].opponentName}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default History;
