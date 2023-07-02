import React, { useEffect, useState } from 'react';
import Booking from '../../../Interfaces/Booking.interface';
import AdminService from '../../../Services/Admin.service';

interface Props {
	key?: string;
	booking: Booking;
}
const PastBookings: React.FC<Props> = (props) => {
	// console.log(booking);
	const [userName, setUserName] = useState<string>('');
	const [partnerName, setPartnerName] = useState<string>('');

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
				const userId = props.booking.user;
				const partnerId = props.booking.peer?.[0]?.opponent;
				const userResult = await AdminService.getMember({ _id: userId });
				const partnerResult = await AdminService.getMember({ _id: partnerId });
				console.log(userResult.name);
				console.log(partnerResult.name);
				setUserName(userResult.name);
				setPartnerName(partnerResult.name);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="primary text-white rounded p-4 mb-3">
			<div className="flex-wrap justify-between">
				<p>slotName:{props.booking.slot.slotName}</p>
				<p>slotTime:{formatTime(props.booking.slot.time)}</p>
				<p>
					Date:
					{new Date(props.booking.date).toLocaleDateString('en-US', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</p>
				<p className="">
					<strong>Main Player:</strong>
					{userName}
				</p>
				<p className="">
					<strong>Partner Player:</strong>
					{partnerName}
				</p>
			</div>
		</div>
	);
};

export default PastBookings;
