import Booking from '../../../Interfaces/Booking.interface';
import './UpcomingEvents.component.css';

const UpcomingEvents: React.FC<Booking> = (props) => {
	// console.log(booking);
	return (
		<div className="">
			<h1>Upcoming Events</h1>
			<div className="cards">
				<div className="card">
					<h3 className="">
						<strong>Date:</strong>
					</h3>
					<h3>slotName:{props.slot.slotName}</h3>
					<h3>slotTime:{props.slot.time}</h3>
					<h3 className="">
						<strong>Court Number:</strong>
					</h3>
					<h3 className="">
						<strong>Main Player:</strong>
					</h3>
					<h3 className="">
						<strong>Partner Player:</strong>
					</h3>
					<a
						href="#"
						className="btn"
						style={{ color: 'red' }}>
						Cancel
					</a>
				</div>
			</div>
		</div>
	);
};

export default UpcomingEvents;
