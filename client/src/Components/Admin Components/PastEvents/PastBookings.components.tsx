import React from 'react';
import Booking from '../../../Interfaces/Booking.interface';

interface Props {
	key?: string;
	booking: Booking;
}
const PastBookings: React.FC<Props> = (props) => {
	// console.log(booking);
	return (
		<div className="">
			<div className="">
				<div className="bg-shadow bg-white p-3 rounded-md ">
					<h3 className="card-name">
						<strong>Date:</strong>
						{props.booking.slot.time}
					</h3>
					<h3 className="card-name">
						<strong>Court Number:</strong>
					</h3>
					<h3 className="card-name">
						<strong>Main Player:</strong> {props.booking.slot.slotName}
					</h3>
					<h3 className="card-name">
						<strong>Partner Player:</strong>
					</h3>
				</div>
				<br />
			</div>
		</div>
	);
};

export default PastBookings;
