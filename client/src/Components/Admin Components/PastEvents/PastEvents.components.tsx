import React from 'react';
import Booking from '../../../Interfaces/Booking.interface';

const PastEvents: React.FC<Booking> = (props) => {
	// console.log(booking);
	return (
		<div className="">
			<div className="">
				<div className="bg-shadow bg-white p-3 rounded-md ">
					<h3 className="card-name">
						<strong>Date:</strong>
						{props.slot.time}
					</h3>
					<h3 className="card-name">
						<strong>Court Number:</strong>
					</h3>
					<h3 className="card-name">
						<strong>Main Player:</strong> {props.slot.slotName}
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
