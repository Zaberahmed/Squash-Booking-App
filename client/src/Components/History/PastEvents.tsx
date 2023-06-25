import React from "react";

interface PastEventsProps{
	booking:any;
}

const PastEvents:React.FC<PastEventsProps> = ({booking}) => {
	// console.log(booking);
	return (
		<div className="">
			
			<div className="">
				<div className="bg-shadow bg-white p-3 rounded-md ">
					<h3 className="card-name">
						<strong>Date:</strong>{booking.slot.time}
					</h3>
					<h3 className="card-name">
						<strong>Court Number:</strong> 
					</h3>
					<h3 className="card-name">
						<strong>Main Player:</strong> {booking.slot.slotName}
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
