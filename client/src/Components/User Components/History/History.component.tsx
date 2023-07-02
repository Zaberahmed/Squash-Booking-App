import { useEffect, useState } from 'react';
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
						try {
							const opponent = await UserService.getUser({ _id: opponentId });
							if (result.peer && result.peer[0] && opponent) {
								result.peer[0].opponentName = opponent.name;
							}
						} catch (error) {
							console.log(error);
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
			<h2 className="primary pt-7 rounded-t-lg mb-7 text-center text-2xl pb-4 font-large font-bold text-white">User History</h2>
			{histories?.map((history) => (
				<div
					className="history-card"
					key={history._id}>
					<div className="overflow-y-scroll ">
						<div className="primary p-3 rounded flex justify-between font-bold text-white">
							<p className="p-1">
								{new Date(history.date).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</div>

						<p className="secondary p-1 rounded text-black ">
							<strong>Time: </strong>
							{formatTime(history.slot.time)}
						</p>
						<p className="secondary p-1 rounded text-black ">
							<strong>Partner: </strong>
							{history.peer?.[0].opponentName}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default History;
