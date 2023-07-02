import React from 'react';
import Booking from '../Interfaces/Booking.interface';

interface Props {
	key?: string;
	booking: Booking;
}
const PastEvents: React.FC<Props> = (props) => {
	// console.log(booking);
	return (
		<div className="">
			<div className="primary text-white rounded p-4 mb-3">
				<div>
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

export default PastEvents;
